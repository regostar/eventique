gcloud functions deploy send_email --runtime python39 --trigger-http --allow-unauthenticated --set-env-vars SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY'

Create a queue - task

gcloud tasks queues create email-queue --location=us-central1



