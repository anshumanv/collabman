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

NOTE: If server fails to run due to some SSL errors, go to `collabman/settings.py` and set DATABASES to
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}
```


##### Frontend

Change the directory to frontend folder, install dependencies and start app.

```sh
cd frontend/
npm i && npm start
```

## Testing

1. Setup testing enviroment
    ```sh
    sudo -su postgres
    psql
    ALTER USER test CREATEDB;
    \q
    exit
    ```
2. Testing
    ```sh
        python manage.py test
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

