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

docker run --env-file .env backend-eventique

docker --env-file .env run --name backend-eventique -p 8000:8000  -d api_server

docker run --env-file .env  --name backend-eventique -p 8000:8000  -d api_server
