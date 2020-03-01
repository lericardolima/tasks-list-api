require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DEVELOPMENT_POSTGRES_USERNAME,
    "password": process.env.DEVELOPMENT_POSTGRES_PASSWORD,
    "database": process.env.DEVELOPMENT_POSTGRES_DATABASE,
    "host": process.env.DEVELOPMENT_POSTGRES_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.TEST_POSTGRES_USERNAME,
    "password": process.env.TEST_POSTGRES_PASSWORD,
    "database": process.env.TEST_POSTGRES_DATABASE,
    "host": process.env.TEST_POSTGRES_HOST,
    "dialect": "postgres"
  }
}