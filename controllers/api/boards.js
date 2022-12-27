const Board = require('../../models/board')

const boardDataController = {
    //Index
    index(req, res, next)
    {
        Board.find({}, (err, frounBoards)=>{
            if(err){
                res.satus(400).send({
                    msg:err.message,
                    output: 'could not find baords boards.index'
                })
            }else{
                res.locals.data.boards = frounBoards
                next()
            }
        })
    },
    //Destroy 
    destroy(req,res,next)
    {
        Board.findByIdAndDelete(req.params.id,(err, deletedboard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                    output: 'could not delete baords boards.destroy'
                })
            }else{
                res.locals.data.board = deletedboard
                next()
            }
        })
    },

    //Update
    update(req,res, next)
    {
        Board.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, updatedBoard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                    output: 'could not update baords boards.update'
                })
            }else{                    
                res.locals.data.board = updatedBoard
                next()
            }
        })
    },

    //Create
    create(req, res, next){
        Board.create(req.body,(err, createdBoard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                    output: 'could not create baord boards.create'
                })
            }else{
                res.locals.data.company = createdBoard
                next()
            }
        })
    },
    //Show
    show(req,res,next){
        Board.findById(req.params.id,(err,foundBoard)=>{
            if(err){
                res.status(400).send({
                    msg:err.message,
                    output: 'could not show baord controlers/api/boards.show'
                })
            }else{
                res.locals.data.board = foundBoard
                next()
            }
        })
    }
}

const apiController = {
    index(req, res, next){
      res.json(res.locals.data.boards)
    },
    show(req, res, next){
      res.json(res.locals.data.board)
    }
}

module.exports = {boardDataController, apiController}