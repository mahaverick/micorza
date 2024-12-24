# Micorza Core Server

This is a core server for Micorza. It handles all the backend operations, including database interactions, authentication, and email notifications. The server is built using Node.js and Express, and it connects to a PostgreSQL database.

## Steps to start development

### Install all the dependencies

`npm install` or `yarn`

### Verify .env files with following values

`PORT=5656`
`HOST=localhost:5656`
`DATABASE_URL=postgresql://admin:admin@localhost:5432/micorza`
`TOKEN_PUBLIC_KEY=`
`TOKEN_PRIVATE_KEY=`
`SMTP_HOST=smtp.mailtrap.io`
`SMTP_PORT=2525`
`SMTP_USERNAME=`
`SMTP_PASSWORD=`
`EMAIL_FROM=noreply@micorza.com`

### Run the development server

`npm run dev` or `yarn dev`

## Project Structure

The layout of the project is:

- `src/`: This directory contains all of the project's source code.
- `.env`: This file contains environment variables for the development environment.
