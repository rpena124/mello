const {Schema, model} = require('mongoose')

const boardSchema = new Schema({
    title: String,
    list:[{
        type:Schema.Types.ObjectId, 
        ref:'List'
    }],
    user:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    }
},{
    timestamps:true
})

const Board = model('Board', boardSchema)

module.exports = Board