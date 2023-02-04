const {Schema, model} = require('mongoose')

const cardSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    order: {type:Number, default:0}
},{
    timestamps:true
})

const Card = model('Card', cardSchema)

module.exports = Card