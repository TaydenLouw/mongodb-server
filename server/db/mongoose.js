var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds159782.mlab.com:59782/tayden-todo-app',{useNewUrlParser: true});

module.exports.mongoose = mongoose;