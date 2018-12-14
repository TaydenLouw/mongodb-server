var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Localhost:27017/TodoApp',{useNewUrlParser: true});

module.exports.mongoose = mongoose;