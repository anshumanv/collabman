<p align="center"><img src="./static/repo-icon.svg" align="center" width="175"></p>
<h1 align="center">collabman</h1>

<p align="center">
<a href="https://travis-ci.com/anshumanv/collabman"><img src="https://img.shields.io/travis/com/anshumanv/collabman/master.svg?style=for-the-badge" align="center"></a>
<a href="https://github.com/anshumanv/collabman/issues"><img src="https://img.shields.io/github/issues/anshumanv/collabman.svg?style=for-the-badge" align="center"></a>
<a href="https://github.com/anshumanv/collabman/issues"><img src="https://img.shields.io/badge/React-16.4.2-blue.svg?style=for-the-badge" align="center"></a>
<a href="https://github.com/anshumanv/collabman/issues"><img src="https://img.shields.io/badge/python-3.7-orange.svg?style=for-the-badge" align="center"></a>
</p>
<hr>
<p align="center">Collaboration management tool for team projects.</p>


### Development


##### Database

Setup local Postgres database instance

```sh
sudo -su postgres
psql
create user <username> with password '<password>';
create database <database name> owner <username>;
grant all privileges on database <database name> to <username>;
```


##### Server

Create .env file and fill in the details.
```sh
cp .env.samle .env
```

Create virtual environment and install dependencies

```sh
pipenv shell
pipenv install
```

Run the devlopment server

```sh
python3 manage.py runserver
```


##### Frontend

Change the directory to frontend folder, install dependencies and start app.

```sh
cd frontend/
npm i && npm start
```

## Testing


### Backend

1. Make sure you have a local db instance created during setting up local development, make sure your user has the permissions to create databases.

```sh
sudo -su postgres
psql
ALTER USER <username> CREATEDB;
\q
exit
```


2. Creating a test db and running tests.
```sh
python manage.py test
```

### Frontend

1. Install dependencies and run tests

```sh
cd frontend
npm i && npm test
```


## Deployment

Frontend is served as a django app and for some reason I couldn't find apt deployment so this is a workaround for deploying a coupled django and react app on heroku. It's adviced to make a copy of the project while deploying, quite inconvenient I know but you won't end up messing the working project structure.

* Add NodeJS as a heroku buildpack

```sh
heroku buildpacks:add --index 1 heroku/nodejs
```


* Move the contents of the frontend app to the project root

```sh
mv frontend/* ./
```

* Should be good now

```sh
git add .
git commit -m "..."
git push heroku master
```

