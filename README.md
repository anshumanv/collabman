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
