# Covid beds availability app


* Application is currently hosted on ngrok URI https://08b1f7e2426b.ngrok.io


* Clone git repository


* Steps to setup backend -
1. Install mongo db
2. Start mongod service, make sure the service is running on port 27017
3. Add database covibeds
4. On terminal/ cmd, navigate to **../coviBeds/backend** directory
5. Make sure python 3.7 or above is installed
6. Start a virtual environment
7. install python requirement from requirements.txt file **pip install -r requirements.txt**
8. Run commands python **manage.py makemigrations** and python **python manage.py migrate**. Some collections should be added to covibeds database. Confirm following collections have been added - _bed_availablity_service_availableambulances_, _bed_availablity_service_availablehospitalbeds_, _bed_availablity_service_availablesafehomes_
9. Optionally, initial data data can be imported to collections from below -
    - **bed_availablity_service_availableambulances**: _/coviBeds/backend/db_ambulance.json_
    - **bed_availablity_service_availableambulances**: _/coviBeds/backend/db_safe_home.json_
    - **bed_availablity_service_availablehospitalbeds**: _/coviBeds/backend/db_hospital.json_
11. Run **datasource.py**, this is a scheduled task and will keep executing every 4 hours
12. Finally, run **python manage.py runserver**. Django should be started on localhost


* Steps to setup frontend -
1. Install node.js
2. We are using nvm > 12, make sure nvm is set to 12
3. Install yarn
4. Navigate to **../coviBeds/ui** directory
5. Run command **yarn install**
6. Run command **yarn start**


* Steps to host on ngrok -
1. Setup ngrok
2. Login to ngrok and get the **auth_token**
3. On .ngrok2/ngrok.yml file, make the following entries -
    authtoken: <**auth_token**>
    tunnels:
      first:
        addr: <localhost port hosting frontend>
        proto: http
      second:
        addr: <localhost port hosting backend>
        proto: http
4. Navigate to ngrok directory, and open terminal/ cmd and run command **ngrok start --all**
