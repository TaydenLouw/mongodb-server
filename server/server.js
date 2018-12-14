const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
} );

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req,res) => {
    var id = req.params['id'];
    if(ObjectID.isValid(id)) {
        Todo.findById(id).then((todo) => {
            if(todo){
                res.status(200).send({todo});
            } else {
                res.status(404).send();
            }
            
        }).catch((error) => res.status(400).send());
    } else {
        res.status(404).send();
    }
});

app.delete('/todos/:id', (req,res) => {
    var id = req.params['id'];
    if(ObjectID.isValid(id)) {
        Todo.findByIdAndDelete(id).then((todo) => {
            if(todo){
                res.status(200).send({todo});
            } else {
                res.status(404).send();
            }
            
        }).catch((error) => res.status(400).send());
    } else {
        res.status(404).send();
    }
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params['id'];
    var body = _.pick(req.body, ['completed', 'text']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    if(ObjectID.isValid(id)) {
        Todo.findByIdAndUpdate(id,{
            '$set': body
        },{new: true}          
        ).then((todo) => {
            if(todo){
                res.status(200).send({todo});
            } else {
                res.status(404).send();
            }
            
        }).catch((error) => res.status(400).send());
    } else {
        res.status(404).send();
    }
});



app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${process.env.PORT || 3000}`);
});

module.exports = {app};