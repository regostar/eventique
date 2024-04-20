# to test on local
# from dotenv import load_dotenv
# load_dotenv()


from flask import jsonify
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Demo function
def send_email(request):
    """HTTP Cloud Function to be triggered by HTTP."""
    request_json = request.get_json(silent=True)
    request_args = request.args

    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    sender_email = 'regostar007@gmail.com'  # This should be a verified sender email in SendGrid
    recipient_email = 'regostar006@gmail.com'
    subject = 'Hello from Google Cloud Function!'
    content = 'This email is sent from a Google Cloud Function using SendGrid.'

    if request_json and 'recipient' in request_json:
        recipient_email = request_json['recipient']
    elif request_args and 'recipient' in request_args:
        recipient_email = request_args['recipient']

    message = Mail(
        from_email=sender_email,
        to_emails=recipient_email,
        subject=subject,
        plain_text_content=content)

    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        return jsonify({'message': 'Email sent successfully!', 'status_code': response.status_code})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
