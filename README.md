# List of tasks API
![Node.js CI](https://github.com/lericardolima/tasks-list-api/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/lericardolima/tasks-list-api/badge.svg)](https://coveralls.io/github/lericardolima/tasks-list-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c77fbf6f07e240fbae1d6c2cd0f0b2e8)](https://www.codacy.com/manual/lericardolima/tasks-list-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lericardolima/tasks-list-api&amp;utm_campaign=Badge_Grade)

RESTful API created for educational purposes. This exercise was based on the following tutorials:
*  [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
*  [Getting Started with Node, Express and Postgres Using Sequelize](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)
*  [Simple rest api builing with mysql and express js and testing with mocha and chai](https://medium.com/@tariqul.islam.rony/simple-rest-api-builing-with-mysql-and-express-js-and-testing-with-mocha-and-chai-ed0d19f25f79)
*  [Adding Swagger To Existing Node.js Project](https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b)
---
### Technologies

*  [npm](https://www.npmjs.com/)
*  [Node.js](https://nodejs.org/en/)
*  [PostgreSQL](https://www.postgresql.org/)
*  [ElephantSQL](https://www.elephantsql.com/)
*  [Sequelize](https://sequelize.org/)
*  [Express](https://expressjs.com/pt-br/)
*  [nodemon](https://nodemon.io/)
*  [Mocha](https://mochajs.org/)
*  [Chai Assertion Library](https://www.chaijs.com/)
*  [Swagger](https://swagger.io/)
*  [GitHub Actions](https://github.com/features/actions)
*  [Heroku](https://dashboard.heroku.com/)
*  [dotenv](https://www.npmjs.com/package/dotenv)
*  [istanbul](https://istanbul.js.org/)
*  [Coveralls](https://coveralls.io/)
*  [Codacy](https://www.codacy.com/)
---
### Explore

  The Task List API and its Swagger documentation page are available on [Heroku](https://lericardolima-task-list-api.herokuapp.com/api/swagger-ui/).

---
### Installation

You cant set your development environment following these steps:

#### Choose your database

  Create a `.env` file in the root path and add your PostgresSQL database configuration for development and/or test
  ```
  DEVELOPMENT_POSTGRES_HOST=host
  DEVELOPMENT_POSTGRES_DATABASE=database
  DEVELOPMENT_POSTGRES_USERNAME=username
  DEVELOPMENT_POSTGRES_PASSWORD=password

  TEST_POSTGRES_HOST=host
  TEST_POSTGRES_DATABASE=database
  TEST_POSTGRES_USERNAME=username
  TEST_POSTGRES_PASSWORD=password
  ```

#### Install dependencies

  Then run the following to build the dependencies:
  ```
  npm install
  ```

#### Run

  And now you are able to run the server:
  ```
  npm run start:dev
  ```

  The API documentantion will be available on [localhost:8000/api](http://localhost:8000/api/).
#### Test

  To run the test and see the test coverage just run:
  ```
  npm test
  ```

 `---`
  ## Contributor
  
   **Ricardo de Lima Rocha**
  *  [Linkedin](https://www.linkedin.com/in/ricardo-de-lima-rocha/)
  *  [GitHub](https://github.com/lericardolima)
