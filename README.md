# collabman

Collaboration management tool for team projects.


### Development


1. Setup local Postgres database

```sh
sudo -su postgres
psql
create user <username> with password '<password>';
create database <database name> owner <username>;
grant all privileges on database <database name> to <username>;
```

2. Create .env file and fill in the details.
```sh
cp .env.samle .env
```

3. Create virtual environment and install dependencies

```sh
pipenv shell
pipenv install
```

4. Run the devlopment server

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


5. Run the frontend

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


## Deploy

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

