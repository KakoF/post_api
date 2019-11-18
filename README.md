# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

# Server Requeriments

Read https://adonisjs.com/docs/4.1/installation

OR Follow Steps:

* Node.js >= 8.0.0
* npm >= 3.0.0

- https://nodejs.org/en/

* CLI AdonisJs

```bash
npm i -g @adonisjs/cli
```

## Setup

Clone the repo and then run

```bash
npm install
```

## Configure your .env
Copy and past your .env.example and rename to .env

Set environment variables in .env file
 
Run
```key:generate
adonis key:generate
```


## Database

This simple API using Postgre database and using PG driver. You can change!

Docs: https://adonisjs.com/docs/3.2/database-setup

Just install driver and change default driver name in .env file
DB_CONNECTION=pg


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

Run the following command to populate base init.

```js
adonis seed
```
User admin
```admin
username: admin
email: admin@admin.com
password: admin1234
```

To run local:
```admin
adonis serve --dev
```
