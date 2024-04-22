Steps to Run Backend :- 

1. Create a Virtual Environment (name it - venv)

    (Windows - )
    python -m venv c:\path\to\myenv
    (Linux - )
    python3 -m path/venv

2. Activate the environment

    cmd.exe -

    C:\> <venv>\Scripts\activate.bat

    PowerShell -

    PS C:\> <venv>\Scripts\Activate.ps1

    Linux -
    source venv/bin/activate

Once activated successfully, it will have the venv name in your terminal

3. Install requirements.txt

    pip install -r requirements.txt

4. Now create the environment variables by creating a .env file

    vi backend\.env

    Paste the contents provided by rEgO

5. Runserver

    cd backend\api_server

    python manage.py runserver

Hola! your server should be up on default 3000 port now





Postgre DB :- 

https://console.neon.tech/app/projects

Connection String :- 

postgresql://eventique_owner:**********@ep-yellow-hall-a5y5g8pp.us-east-2.aws.neon.tech/eventique?sslmode=require


Docker commands :- 
---------------------

You can see the Docker containers that are currently running on your system (along with their Container IDs) with:
-----------------------------------------

docker ps -a

To run :- (we need .env file so cd to the path where u have .env and then run this command)
-------

docker run --env-file .env  --name backend-eventique -p 8000:8000  -d backend-eventique

To turn off your Docker container, run:
-----------------------------------
docker stop container_id

Using docker compose file to build an image :- 
-----------------------------------------

docker-compose build

To run the image :- 
-------------------

docker-compose up -d

gcloud auth login




TO PUSH TO CLOUD RUN:- 
-----------------------

Initial setup -

gcloud init

gcloud auth configure-docker us-south1-docker.pkg.dev


--------------
docker build -t us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-backend/backend-web -f Dockerfile --platform linux/x86_64 .

docker push us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-backend/backend-web

------------------------------

Frontend docker :-

docker build -t us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-frontend/frontend-web -f Dockerfile --platform linux/x86_64 .

docker push us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-frontend/frontend-web


export IMAGE_TAG=us-south1-docker.pkg.dev/CodeSnap/eventique-backend/backend-web

docker build -t us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-backend/backend-web -f Dockerfile --platform linux/x86_64 .
docker push us-south1-docker.pkg.dev/bamboo-theorem-415222/eventique-backend/backend-web


docker run --env-file .env backend-eventique

docker --env-file .env run --name backend-eventique -p 8000:8000  -d api_server

docker run --env-file .env  --name backend-eventique -p 8000:8000  -d api_server

docker tag eventique-backend regostar/eventique-backend

https://medium.com/@roman.njoroge_90440/google-gemini-tutorial-how-to-build-a-chat-app-with-characters-from-your-favorite-show-a8c0efd732ef
