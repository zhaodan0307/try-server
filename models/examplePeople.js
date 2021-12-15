// link to mongoose
// 第一步，链接mongoose
const mongoose = require('mongoose')

// define a schema for artists
// 第二步，链接schema
var examplePeopleSchema = new mongoose.Schema({

    name:String,
    age:Number,
    address :[{
        code: String,
        street: String,

    }]
})

module.exports = mongoose.model('ExamplePeople', examplePeopleSchema)