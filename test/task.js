process.env.NODE_ENV = "test";

const Task = require('../server/models').Task;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('POST task', () => {
    it('Should create a new default status task', (done) => {

        const task = {
            description: 'Write tests'
        }

        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('description');
                response.body.should.have.property('status').eq('pending');
                response.body.should.have.property('createdAt');
                response.body.should.have.property('updatedAt');
                response.should.have.property('statusType').eq(2);
                done();
            });
    })
});
describe('POST task', () => {
    it('Should create a new specific status task', (done) => {

        const task = {
            description: 'Procrastinate',
            status: 'ongoing'
        }

        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('description');
                response.body.should.have.property('status').eq('ongoing');
                response.body.should.have.property('createdAt');
                response.body.should.have.property('updatedAt');
                response.should.have.property('statusType').eq(2);
                done();
            });
    })
});

describe('GET tasks', () => {
    it('Should list all tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
    });
});

describe('GET task/:taskId', () => {
    it('Should get a task by ID', (done) => {

        Task.create({
            description: 'Exercise'
        }).then(task => {
            chai.request(app)
                .get(`/api/tasks/${task.id}`)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(task.id);
                    done();
                });
        });
    });
});

describe('PUT task/:taskId', () => {
    it('Should update a task with given ID', (done) => {

        Task.create({
            description: 'Do nothing until 6pm'
        }).then(task => {

            const updatedAt = task.updatedAt;
            chai.request(app)
                .put(`/api/tasks/${task.id}`)
                .send({
                    description: 'Work until 6pm',
                    status: 'completed'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(task.id);
                    response.body.should.have.property('description').eq('Work until 6pm');
                    response.body.should.have.property('status').eq('completed');
                    response.body.should.have.property('updatedAt').not.eq(updatedAt);
                    done();
                });
        });
    });
});

describe('DELETE task/:taskId', function () {
    it('Should delete a task with given ID', function (done) {

        Task.create({
            description: 'Watch TV'
        }).then(task => {
            chai.request(app)
                .delete(`/api/tasks/${task.id}`)
                .end((error, response) => {
                    response.should.have.status(204);
                    response.body.should.be.empty;

                    chai.request(app)
                            .get(`/api/tasks/${task.id}`)
                            .end((err, res) => {
                                res.should.have.status(404);
                                res.body.should.have.property('message').eq('Task not found');
                                done();
                            })
                });
        });
    });
});

after((done) => {
    Task.destroy({
        where: {}
    })
        .then(() => {
            done();
        });
})