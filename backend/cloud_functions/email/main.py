import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# to test on local
from dotenv import load_dotenv
load_dotenv()


# Demo function
def send_email(event, context):
    """Background Cloud Function to be triggered by HTTP."""
    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    sender_email = 'regostar007@gmail.com'  # This should be a verified sender email in SendGrid
    recipient_email = 'sparshadandganhalliprakash@my.unt.edu'
    subject = 'Hello from Google Cloud Function!'
    content = 'This email is sent from a Google Cloud Function using SendGrid.'

    message = Mail(
        from_email=sender_email,
        to_emails=recipient_email,
        subject=subject,
        plain_text_content=content)

    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        return 'Email sent successfully!', 200
    except Exception as e:
        return str(e), 500
