# Project Setup
### Before project setup make sure you have python>=3.8 and node>=12
- First clone the repo with HTTP link
- Now run all this in terminal
    - pip install pre-commit
    - pip install virtualenv
    - npm install -g @arkweid/lefthook
- Create `.env` file inside `e-kart/backend/backend/` folder with following variables
<pre>
SECRET_KEY=django-insecure-dac#922sg-az=_h(z)yd3g$vbqyhaqzp#7$p5m-bft#*&q=*3q
DEBUG=True
FRONTEND_URL=http://localhost:3000
ALLOWED_HOSTS="localhost,127.0.0.1"
</pre>
- Create `.env.development.local` file inside `e-kart/frontend` folder with following variable
<pre>
REACT_APP_BACKEND_URL=http://localhost:8000
</pre>
- Navigate to project folder using Terminal / CMD
- run `virtualenv env` this will create virtual environment for our project
- Now activate `env`
    - Windows: `env/Scripts/activate` or `env\Scripts\activate`
    - Linux / MacOS: `source env/bin/activate`
- To setup `Backend Server` follow below steps
    - navigate to backend folder from terminal using `cd backend`
    - run `pip install -r requirements.txt`
    - to create database execute this commands
        - `python manage.py makemigrations`
        - `python manage.py migrate`
    - start backend server using `python manage.py runserver`
- To setup `Frontend Server` follow below steps
    - navigate to `frontend folder` using `cd ../frontend`
    - run `npm install`, it takes time to install all packages
    - now our all frontend packages are installed, if not wait for sometime, npm takes time to install packages
    - run `lefthook install`
    - start frontend server using `npm run start`
- Now both the server are running, verify with below links
    - Backend Server: http://localhost:8000
    - Frontend Server: http://localhost:3000
## Note
- Before starting the servers make sure you have activated `env`
- Always run backend server from `e-kart/backend` folder, using `python manage.py runserver` command
- Always run frontend server from `e-kart/frontend` folder, using `npm run start` command
- Make sure you run all commands from `8th point (Backend setup)` after every pull
