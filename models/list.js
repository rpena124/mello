const {Schema, model, mongo, default: mongoose} = require('mongoose')

const listSchema = new Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: {type: String, required: true},
    card:[{type: mongoose.Schema.Types.ObjectId, ref:'Card'}]
},{
    timestamps:true
})

const List = model('List', ListSchema)

module.exports = List