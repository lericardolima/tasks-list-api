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
                response.body.should.have.lengthOf(1);
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