const {Schema, model, mongo, default: mongoose} = require('mongoose')

const cardSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    completed: Boolean,
},{
    timestamps:true
})

const Card = model('Card', boardSchema)

module.exports = Card