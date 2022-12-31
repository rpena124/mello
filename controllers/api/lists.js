const List = require('../../models/list')

const ListDataController = {
    //Index
    index(req, res, next)
    {
        List.find({}, (err, froundLists)=>{
            if(err){
                res.satus(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.lists = froundLists
                next()
            }
        })
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
                res.locals.data.board = createdList
                next()
            }
        })
    },
    //Show
    show(req,res,next){
        List.findById(req.params.id,(err,foundList)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                })
            }else{
                res.locals.data.list = foundList
                next()
            }
        })
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