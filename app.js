const logger = require('morgan');
const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');

if (process.env.NODE_ENV !== 'production')
    app.use(logger('dev'));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
app.get('*', (req, res) => res.redirect('/api/swagger-ui'));

module.exports = app;