[![Build Status](https://travis-ci.org/papasmurf17/budget-manager.svg?branch=master)](https://travis-ci.org/papasmurf17/budget-manager)
![GitHub](https://img.shields.io/github/license/papasmurf17/budget-manager.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/papasmurf17/budget-manager.svg)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)
# Budget Manager

Web Application to track all the expenses.

![Budget Manager](./frontend/public/assets/startup.png)

# Requirements

- NodeJS
- MongoDB
- Keycloak

# UI

Frontend is entirely realized with [ReactJS](https://reactjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/).

We adopted the [WellD react component](https://react-components.welld.io) library to build the frontend interface. The structure of the pages is made with [tailwindcss](https://tailwindcss.com/).

During the development the frontend is served by **webpack dev server**. When the application is installed on QA or PROD environment the FE assets are served by express server (`frontend/server.js`) and it redirects graphQL requests to the BE.

## Installation & run 🏃🏿‍♂️

From `frontend` folder run `yarn install`. Now the FE is ready to be started, execute `yarn start` always from the `frontend` folder. 

# BE

We use [Express](https://expressjs.com/) and Apollo [GraphQL](https://www.apollographql.com) to expose a graphQL API. Data are stored on mongodb and our ORM is [mongoose](https://mongoosejs.com).

# DB

We use mongodb to store the transactions. We have a text index `db.transactions.createIndex( { "$**": "text" } )` to perform full text searches.

# Authentication & authorization 🔐

Our authentication layer is provided by [keycloak](https://www.keycloak.org/). When there is not a valid session or the session is expired the frontend redirect the User to the keycloak login page.

Each request to the backend contains the `Authorization` header with the `Bearer` token. The backend validates the token and extracts username and roles from it.

There are 3 roles:
- **read**: user with this role can visualize and filter the transaction
- **edit**: user with this role can add and modify a transaction
- **delete**: user with this role can delete a transaction

# QA environment

Test Application is hosted on [Heroku](https://heroku.com/) and it provides us even the mongoDB. Keycloak server is on private server and it is connected to private LDAP.
