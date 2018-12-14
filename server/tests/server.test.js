const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');


var {app} = require('./../server');
var {Todo} = require('./../models/todo');

var todos = [{
    text: "First test todo"
}, {
    text: "Second test todo"
}];

var id = "";



beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then((res) => {
        id = res[0].id;
        done();
    });
    
});

describe('POST /todos', () => {
    it('Should create a new todo.', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch((error) => done(error));
        });
    });

    it('Should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((error) => done(error));
        })
    });
});



describe('GET /todos', () => {
    it('Should return all todos', (done) => {

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET /todos/:id', () => {
    it('Should return a 404 error when supplied with invalid ID', (done) => {

        request(app)
        .get(`/todos/123456`)
        .expect(404)
        .end(done);
    });

    it('Should return a 404 error when supplied with a valid ID but todo not found', (done) => {

        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return a todo', (done) => {

        request(app)
        .get(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo).toBeTruthy();
            expect(res.body.todo['_id']).toBe(id);
            expect(res.body.todo['text']).toBe(todos[0].text);
        })
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should return a 404 error when supplied with invalid ID', (done) => {

        request(app)
        .delete(`/todos/123456`)
        .expect(404)
        .end(done);
    });

    it('Should return a 404 error when supplied with a valid ID but todo not found', (done) => {

        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return a todo', (done) => {

        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo).toBeTruthy();
            expect(res.body.todo['_id']).toBe(id);
            expect(res.body.todo['text']).toBe(todos[0].text);
            Todo.findById(id).then((res) => {
                expect(res).toBeFalsy();
            }).catch((e) => done(e));
        })
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('Should return a 404 error when supplied with invalid ID', (done) => {

        request(app)
        .patch(`/todos/123456`)
        .expect(404)
        .end(done);
    });

    it('Should return a 404 error when supplied with a valid ID but todo not found', (done) => {

        request(app)
        .patch(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return a todo', (done) => {

        request(app)
        .patch(`/todos/${id}`)
        .send({
            text: "Test text",
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo).toBeTruthy();
            expect(res.body.todo['_id']).toBe(id);
            expect(res.body.todo['text']).toBe("Test text");
            expect(res.body.todo['completedAt']).toBeTruthy();
            Todo.findById(id).then((res) => {
                expect(res).toBeTruthy();
            }).catch((e) => done(e));
        })
        .end(done);
    });
});