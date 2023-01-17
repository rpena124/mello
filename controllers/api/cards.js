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
                res.locals.data.cards = foundCards
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
                res.locals.data.card = deletedCard
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
                res.locals.data.card = updatedCard
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
                            res.locals.data.card = createdCard
                            next()
                        }
                    })
                }

        })

    },
    //Show
    async show(req,res,next){
        // Card.findById(req.params.id,(err,foundCard)=>{
        //     if(err){
        //         res.status(400).send({
        //             msg:err.message,
        //         })
        //     }else{
        //         res.locals.data.card = foundCard
        //         next()
        //     }
        // })

        const cards = await Card.findById(req.params.listId).populate('title').populate('description')
        res.status(200).json(cards)
    }


}

const apiController = {
    index(req, res, next){
      res.json(res.locals.data.cards)
    },
    show(req, res, next){
      res.json(res.locals.data.card)
    }
}

module.exports = {CardDataController, apiController}