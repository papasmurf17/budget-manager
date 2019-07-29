require('dotenv').config();

module.exports = {
  db: {
    host: `${process.env.DB_HOST}${process.env.DB_NAME}`,
    name: process.env.DB_NAME
  },
  app: {
    name: 'budget-monitor'
  },
  port: process.env.APP_PORT || 4000,
  version: process.env.PROJECT_VERSION
};
