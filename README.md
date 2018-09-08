# collabman

Collaboration management tool for team projects.


### Development


1. Setup DB

```sh
sudo -su postgres
psql
create user <username> with password '<password>';
create database <database name> owner <username>;
grant ALL ON <database name> to <username>;
OR
GRANT ALL PRIVILEGES ON <database name> to <username>;
```


2. Create .env file
Fill all the required fields in the file.


3. Install dependencies

```sh
pipenv shell
pipenv install
```

OR

```sh
pip install -r requirements.txt
```

4. Run the devlopment server

```sh
python3 manage.py runserver
```

5. Run the frontend

```sh
cd frontend/
npm i
npm start
```
