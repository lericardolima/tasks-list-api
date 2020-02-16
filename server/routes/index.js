const taskController = require('../controllers').tasks;
const path = require('path');

module.exports = (app) => {

    app.get('/api', (req, res) => res.sendFile('index.html', {
        root: path.join(__dirname, './')
    }));

    app.post('/api/tasks', taskController.create);
    app.get('/api/tasks', taskController.list);
    app.get('/api/tasks/:taskId', taskController.get);
    app.put('/api/tasks/:taskId', taskController.update);
    app.delete('/api/tasks/:taskId', taskController.delete);

}