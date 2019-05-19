require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST
  },
  app: {
    name: 'budget-monitor'
  },
  port: process.env.PORT || 4000,
  version: process.env.PROJECT_VERSION
};
