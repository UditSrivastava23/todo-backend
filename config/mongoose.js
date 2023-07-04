const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/Todo_db')

const db = mongoose.connection


db.once('open', ()=>{
    console.log('Successfully connected to thee database')
})

db.on('error',()=>{
    console.log('Error Connecting to the databse');
})