const express = require('express')
const router = express.Router()
const {ListDataController, apiController}= require('../../controllers/api/lists')


//Index : Get /api/lists
router.get('/', ListDataController.index, apiController.index)
//Delete /api/lists/:id
router.delete('/:id',ListDataController.destroy, apiController.show)
//Update /api/lists/:id
router.put('/:id', ListDataController.update, apiController.show)
//Create /api/lists
router.post('/:boardId', ListDataController.create, apiController.show)
//Show: Get /api/lists/:id
router.get('/:listId',ListDataController.show, apiController.show)

module.exports = router