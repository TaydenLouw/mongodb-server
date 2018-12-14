var env = process.env.NODE_ENV || 'developement';
if(env === 'developement') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://Localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://Localhost:27017/TodoAppTest';
} else {
    process.env.MONGODB_URI = 'mongodb://test:test123@ds159782.mlab.com:59782/tayden-todo-app';
};