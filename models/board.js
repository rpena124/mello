const {Schema, model, mongo, default: mongoose} = require('mongoose')

const boardSchema = new Schema({
    title: String,
    list:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'List',
        card:[{      
          type: mongoose.Schema.Types.ObjectId, 
          ref:'Card'
        }]
    }]
},{
    timestamps:true
})

const Board = model('Board', boardSchema)

module.exports = Board