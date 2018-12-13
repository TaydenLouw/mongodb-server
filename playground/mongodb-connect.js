// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://Localhost:27017',{useNewUrlParser: true},(err,db)=>{
    if(err) {
       return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')

    db.db('TodoApp').collection('Users').deleteMany({name: "Tayden"}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    })

    db.db('TodoApp').collection('Users').findOneAndDelete({name: "Test"}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    })

    db.close();
});
