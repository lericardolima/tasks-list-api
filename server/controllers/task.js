const Task = require('../models').Task;

exports.create = (req, res) => {
    return Task.create({
        description: req.body.description,
        status: req.body.status
    })
    .then(task => res.status(201).send(task))
    .catch(error => res.status(400).send(error));
}