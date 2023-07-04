const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    desc : {
        type : String,
    },
    d_date : {
        type : Date,
        required : true
    },
    category : {
        type : String,
        enum : ['Personal', 'School', 'Other'], 
        required : true
    },
    school : {
        type : String
    }
}, {
    timestamps : true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task