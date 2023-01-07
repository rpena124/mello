const Board = require('../../models/board')

const boardDataController = {
    //Index
    async index(req, res, next)
    {

        const boards = await Board.find({}).populate({
            path:'list',
            populate:[
                {
                    path:'card',
                }
            ]
        })
        res.status(200).json(boards)
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
                res.locals.data.board = createdBoard
                next()
            }
        })
    },
    //Show
    async show(req,res,next){

        const boards = await Board.findById(req.params.boardId).populate('list')
        res.status(200).json(boards)
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