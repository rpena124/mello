const express = require('express')
const router = express.Router()
const {ListDataController, apiController}= require('../../controllers/api/lists')


//Index : Get /api/boards
router.get('/', ListDataController.index, apiController.index)
//Delete /api/boards/:id
router.delete('/:id',ListDataController.destroy, apiController.show)
//Update /api/boards/:id
router.put('/:id', ListDataController.update, apiController.show)
//Create /api/boards
router.post('/board/:boardId', ListDataController.create, apiController.show)
//Show: Get /api/boards/:id
router.get('/:listId',ListDataController.show, apiController.show)

module.exports = router