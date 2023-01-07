const List = require('../../models/list')
const Card = require('../../models/card')

const CardDataController = {
    //Index
    index(req, res, next)
    {
        Card.find({}, (err, foundCards)=>{
            if(err){
                res.satus(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.Cards = foundCards
                next()
            }
        })
    },
    //Destroy 
    destroy(req,res,next)
    {
        Card.findByIdAndDelete(req.params.id,(err, deletedCard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.Card = deletedCard
                next()
            }
        })
    },
    //Update
    update(req,res, next)
    {
        Card.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, updatedCard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{                    
                res.locals.data.Card = updatedCard
                next()
            }
        })
    },
    //Create
    create(req, res, next){
   
        Card.create(req.body,(err, createdCard)=>{
                if(err){
                    res.status(400).send({
                        msg:err.message,
                    }) 
                }else{
                    console.log(createdCard._id)
                    List.findByIdAndUpdate(req.params.listId,{$push: {card: createdCard._id}}, (err, foundList) =>{
                        if(err){
                            res.status(400).send({
                                msg:err.message,
                            })
                        }else{
                            res.locals.data.list = createdCard
                            next()
                        }
                    })
                }

        })

    },
    //Show
    show(req,res,next){
        Card.findById(req.params.id,(err,foundCard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.Card = foundCard
                next()
            }
        })
    }
}

const apiController = {
    index(req, res, next){
      res.json(res.locals.data.Cards)
    },
    show(req, res, next){
      res.json(res.locals.data.Card)
    }
}

module.exports = {CardDataController, apiController}