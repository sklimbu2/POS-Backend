const express = require('express')
const router = express.Router()

const {getAllOrders, 
    createOrder, 
    updateOrder, 
    deleteOrder, 
    UploadNewFood, 
    getFoodData 
} = require('../controllers/orders')

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').patch(updateOrder).delete(deleteOrder)
router.route('/upload').post(UploadNewFood )
router.route('/FoodData').get(getFoodData)
module.exports = router