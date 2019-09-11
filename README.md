[![Build Status](https://travis-ci.org/papasmurf17/budget-manager.svg?branch=master)](https://travis-ci.org/papasmurf17/budget-manager)
![GitHub](https://img.shields.io/github/license/papasmurf17/budget-manager.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/papasmurf17/budget-manager.svg)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)
# Budget Manager

Web Application to track all the expenses.

![Budget Manager](./frontend/public/assets/startup.png)

# DB

We use mongodb to store the transactions. We have a text index `db.transactions.createIndex( { "$**": "text" } )` to perform full text searches.
