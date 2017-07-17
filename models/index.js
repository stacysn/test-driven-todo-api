//primary resourse
//top level folder that will be used to require the rest of the models

let mongoose = require('mongoose');
mongoose.connect(process.env.DBPORT || 'mongodb://localhost/todo-app');
