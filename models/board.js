const {Schema, model, mongo, default: mongoose} = require('mongoose')

const boardSchema = new Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    list:[{type: mongoose.Schema.Types.ObjectId, ref:'List'}]
},{
    timestamps:true
})

const Board = model('Board', boardSchema)

module.exports = Board