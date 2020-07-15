const {Router} = require('express')
const router = Router()
const authController = require('../controller/auth.controller')
const orderController = require('../controller/order.controller')


router.post('/create_order', 
    authController.authorize,
    orderController.addOrder
)

router.get('/orders', 
    authController.authorize,
    orderController.getUserOrders
)

router.delete('/deleteOrderItem', 
    authController.authorize,
    orderController.deleteOrderItem,
    orderController.getUserOrders
)

module.exports = router