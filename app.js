const logger = require('morgan');
const bodyParser = require('body-parser');
const app = require('express')();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
app.get('*', (req, res) => res.redirect('/api'));

module.exports = app;