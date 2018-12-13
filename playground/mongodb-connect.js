// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://Localhost:27017',{useNewUrlParser: true},(err,db)=>{
    if(err) {
       return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')

    // db.db('TodoApp').collection('Users').insertOne({
    //     name: "Tayden",
    //     age: 24,
    //     location: "Cape Town"
    // }, (err,result)=>{
    //     if(err) {
    //         return console.log('Unable to insert into MongoDB collection.', err)
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // });
 
    db.db('TodoApp').collection('Todos').find().count().then((result)=>{
        console.log(`Todos count: ${result}`);
    },(err) => {
        console.log('Unable to fetch Todos' + err);
    });

    db.close();
});
