const taskController = require('../controllers').tasks;

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Tasks list API'
    }));

    app.post('/api/tasks', taskController.create);
    app.get('/api/tasks', taskController.list);
    app.get('/api/tasks/:taskId', taskController.get);

}