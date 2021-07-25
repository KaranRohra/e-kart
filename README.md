# Project Setup
Before project setup make sure you have python>=3.8 and node>=12
- First Clone the repo with HTTP link
- Now run all this in terminal
    - `pip install pre-commit`
    - `pip install virtualenv`
    - `npm install -g @arkweid/lefthook`
- Navigate to project folder using Terminal / CMD
- Go inside frontend run `npm install`,  it takes time to install all packages
- Till then open another terminal and navigate to backend folder and follow below steps
    - run `virtualenv env` this will create virtual environment for our project
    - now activate `env`
        - windows: env\Scripts\activate
        - Linux / MacOS: env/bin/activate
    - run `pip install -r requirements.txt`
    - to create database execute this `python manage.py migrate`
    - start backend server using `python manage.py runserver`
    - Now close backend terminal, let's go back to frontend terminal
- Now our all frontend packages are installed, if not wait for sometime, npm takes time to install packages
- run `lefthook install`, make sure you are in frontend folder
- Start frontend server using `npm run start`
- Now both the server are running, verify with below links
    - Backend Server: http://localhost:8000
    - Frontend Server: http://localhost:3000
