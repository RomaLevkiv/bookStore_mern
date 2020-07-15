const {Router} = require('express')
const router = Router()
const authController = require('../controller/auth.controller')
const userController = require('../controller/user.controller')


router.post('/write_to_cart', 
    authController.authorize,
    userController.writeToCart
)

router.get('/getCart',
    authController.authorize,
    userController.getCart
)


module.exports = router