# List of tasks API

RESTful API created for educational purposes. This exercise was based on the following tutorials:
* [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
* [Getting Started with Node, Express and Postgres Using Sequelize](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)

### Technologies

* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [Express](https://expressjs.com/pt-br/)
* [nodemon](https://nodemon.io/)

### Configuration

To set the database configuration, open the file `./server/config/config.json` and change the properties as below:

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "taskListDB",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  }
}
```
Then run the following code in the project root directory:
```
npm run start:dev
```