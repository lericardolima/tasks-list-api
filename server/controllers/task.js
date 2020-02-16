const Task = require('../models').Task;

exports.create = (req, res) => {
    return Task.create({
        description: req.body.description,
        status: req.body.status
    })
    .then(task => res.status(201).send(task))
    .catch(error => res.status(400).send(error));
}

exports.list = (req, res) => {
    return Task.findAll()
                    .then(tasks => res.status(200).send(tasks))
                    .catch(error => res.status(400).send(error));
}

exports.get = (req, res) => {
    return Task.findByPk(req.params.taskId)
                    .then(task => {
                        if (!task)
                            return res.status(404).send({
                                message: 'Task not found'
                            });
                        
                        return res.status(200).send(task);
                    })
                    .catch(error => res.status(400).send(error));
}