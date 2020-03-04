process.env.NODE_ENV = "test";

const Task = require('../server/models').Task;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const task = null;

chai.use(chaiHttp);

beforeEach((done) => {
    Task.create({
        description: 'Test the task endpoints'
    })
        .then(task => {
            this.task = task;
            done();
        })
        .catch(error => {
            done(error);
        });
})

afterEach((done) => {
    Task.destroy({
        where: {}
    })
        .then(() => {
            this.task = null;
            done();
        })
        .catch(error => {
            done(error);
        });
})

describe('POST task', () => {
    it('Should create a new task with default status', (done) => {

        chai.request(app)
            .post('/api/tasks')
            .send({
                description: 'Write tests'
            })
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
    it('Should create a new task with a not default status', (done) => {

        chai.request(app)
            .post('/api/tasks')
            .send({
                description: 'Procrastinate',
                status: 'ongoing'
            })
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

describe('POST task', () => {
    it('Should not create a new task with an invalid status', (done) => {

        chai.request(app)
            .post('/api/tasks')
            .send({
                description: 'Write tests',
                status: 'cancelled'
            })
            .end((error, response) => {
                response.should.have.status(400);
                response.should.have.property('statusType').eq(4);
                done();
            });
    })
});

describe('POST task', () => {
    it('Should not create a new task without description', (done) => {

        chai.request(app)
            .post('/api/tasks')
            .send({
                status: 'ongoing'
            })
            .end((error, response) => {
                response.should.have.status(400);
                response.should.have.property('statusType').eq(4);
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

        chai.request(app)
            .get(`/api/tasks/${this.task.id}`)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id').eq(this.task.id);
                done();
            });
    });
});

describe('GET task/:taskId', () => {
    it('Should not get a task by unexisting ID', (done) => {

        chai.request(app)
            .get(`/api/tasks/${-1}`)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.have.property('message').eq('Task not found');
                done();
            });
    });
});

describe('GET task/:taskId', () => {
    it('Should not get a task by invalid ID', (done) => {

        chai.request(app)
            .get('/api/tasks/id')
            .end((error, response) => {
                response.should.have.status(400);
                response.should.have.property('statusType').eq(4);
                done();
            });
    });
});

describe('PUT task/:taskId', () => {
    it('Should update a task with given ID', (done) => {

        const updatedAt = this.task.updatedAt;
        chai.request(app)
            .put(`/api/tasks/${this.task.id}`)
            .send({
                description: 'Work until 6pm',
                status: 'completed'
            })
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id').eq(this.task.id);
                response.body.should.have.property('description').eq('Work until 6pm');
                response.body.should.have.property('status').eq('completed');
                response.body.should.have.property('updatedAt').not.eq(updatedAt);
                done();
            });
    });
});

describe('PUT task/:taskId', () => {
    it('Should not update a task with an invalid value', (done) => {

        const updatedAt = this.task.updatedAt;
        chai.request(app)
            .put(`/api/tasks/${this.task.id}`)
            .send({
                name: 'Work until 6pm'
            })
            .end((error, response) => {
                response.should.have.status(400);
                done();
            });
    });
});

describe('PUT task/:taskId', () => {
    it('Should not update a task with an unexisting ID', (done) => {

        chai.request(app)
            .put(`/api/tasks/${-1}`)
            .send({
                description: 'Work until 6pm',
                status: 'completed'
            })
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.have.property('message').eq('Task not found');
                done();
            });
    });
});

describe('DELETE task/:taskId', () => {
    it('Should delete a task with given ID', (done) => {

        const deletedTaskId = this.task.id;
        chai.request(app)
            .delete(`/api/tasks/${this.task.id}`)
            .end((error, response) => {
                response.should.have.status(204);
                response.body.should.be.empty;

                chai.request(app)
                    .get(`/api/tasks/${deletedTaskId}`)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.have.property('message').eq('Task not found');
                        done();
                    })
            });
    });
});

describe('DELETE task/:taskId', () => {
    it('Should not delete a task with unexisting ID', (done) => {

        chai.request(app)
            .delete(`/api/tasks/${-1}`)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.have.property('message').eq('Task not found');
                done();
            });
    });
});

describe('DELETE task/:taskId', () => {
    it('Should not delete a task with invalid ID', (done) => {

        chai.request(app)
            .delete('/api/tasks/id')
            .end((error, response) => {
                response.should.have.status(400);
                done();
            });
    });
});