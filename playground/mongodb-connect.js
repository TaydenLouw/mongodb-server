// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://Localhost:27017',{useNewUrlParser: true},(err,db)=>{
    if(err) {
       return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')


    db.db('TodoApp').collection('Users').findOneAndUpdate({name: "Tayden"},{
        $set: {
        name: "Hayley",
        location: "Uitenhage"
    },
    $inc: {
        age: 1
    }
        
    },{returnOriginal: false}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    }).catch((err) => {
        console.log(err);
    })

    db.close();
});
