const express = require('express')
const router = express.Router()
const {CardDataController, apiController}= require('../../controllers/api/cards')


//Index : Get /api/cards
router.get('/', CardDataController.index, apiController.index)
//Delete /api/cards/:id
router.delete('/:id', CardDataController.destroy, apiController.show)
//Update /api/cards/:id
router.put('/:id', CardDataController.update, apiController.show)
//Create /api/cards
router.post('/:listId', CardDataController.create, apiController.show)
//Show: Get /api/cards/:id
router.get('/:id', CardDataController.show, apiController.show)

module.exports = router