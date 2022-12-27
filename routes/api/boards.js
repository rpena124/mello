const express = require('express')
const router = express.Router()
const {boardDataController, apiController}= require('../../controllers/api/boards')


//Index : Get /api/boards
router.get('/', boardDataController.index, apiController.index)
//Delete /api/boards/:id
router.delete('/:id',boardDataController.destroy, apiController.show)
//Update /api/boards/:id
router.put('/:id',boardDataController.update, apiController.show)
//Create /api/boards
router.post('/',boardDataController.create, apiController.show)
//Show: Get /api/boards/:id
router.get('/:id',boardDataController.show, apiController.show)

module.exports = router