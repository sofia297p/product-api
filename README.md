
## Description

A backend application built with NestJS and Prisma ORM.  

## Installation
Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd product-api
npm install
```
## Configuration
Create a .env file in the root directory with your database connection string:
```shell
DATABASE_URL="postgresql://user:password@localhost:5432/test_db"

```
Then run migrations:
```bash
npx prisma migrate deploy
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Api documentation

Swagger UI is available at:

```shell
http://localhost:3000/api

```