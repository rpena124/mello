const express = require('express')
const router = express.Router()
const {CardDataController, apiController}= require('../../controllers/api/cards')


//Index : Get /api/boards
router.get('/', CardDataController.index, apiController.index)
//Delete /api/boards/:id
router.delete('/:id', CardDataController.destroy, apiController.show)
//Update /api/boards/:id
router.put('/:id', CardDataController.update, apiController.show)
//Create /api/boards
router.post('/list/:listId', CardDataController.create, apiController.show)
//Show: Get /api/boards/:id
router.get('/:id', CardDataController.show, apiController.show)

module.exports = router