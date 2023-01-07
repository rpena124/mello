const List = require('../../models/list')
const Board = require('../../models/board')

const ListDataController = {
    //Index
    async index(req, res, next)
    {
        const lists = await List.find({}).populate('card')
        res.status(200).json(lists)
    },
    //Destroy 
    destroy(req,res,next)
    {
        List.findByIdAndDelete(req.params.id,(err, deletedList)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.list = deletedList
                next()
            }
        })
    },
    //Update
    update(req,res, next)
    {
        List.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, updatedList)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{                    
                res.locals.data.list = updatedList
                next()
            }
        })
    },
    //Create
    create(req, res, next){
   
        List.create(req.body,(err, createdList)=>{
                if(err){
                    res.status(400).send({
                        msg:err.message,
                    }) 
                }else{
                    Board.findByIdAndUpdate(req.params.boardId,{$push: {list: createdList._id}}, (err, foundBoard) =>{
                        if(err){
                            res.status(400).send({
                                msg:err.message,
                            })
                        }else{
                            res.locals.data.board = createdList
                            next()
                        }
                    })
                }

        })

    },
    //Show
    async show(req,res,next){
        const lists = await List.findById(req.params.listId).populate('card')
        res.status(200).json(lists)
    }
}

const apiController = {
    index(req, res, next){
      res.json(res.locals.data.lists)
    },
    show(req, res, next){
      res.json(res.locals.data.list)
    }
}

module.exports = {ListDataController, apiController}