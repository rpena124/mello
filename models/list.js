const {Schema, model} = require('mongoose')

const listSchema = new Schema({
    title: {type: String, required: true},
    card:[{type: Schema.Types.ObjectId, ref:'Card'}]
},{
    timestamps:true
})

const List = model('List', listSchema)

module.exports = List