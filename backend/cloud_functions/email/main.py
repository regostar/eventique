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
    data = request.get_json() or {}
    recipient_email = data.get('recipient', recipient_email)
    subject = data.get('subject', subject)
    content = data.get('content', content)

    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    sender_email = os.getenv('SENDER_EMAIL')

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
