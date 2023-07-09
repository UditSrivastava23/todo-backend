const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    task: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'Task'
            }
        }
    ]
},{
    timestamps : true
})

const User = mongoose.model('User', userSchema)

module.exports = User