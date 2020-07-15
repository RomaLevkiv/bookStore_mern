const {Router} = require('express')
const router = Router()
const authController = require('../controller/auth.controller')


router.post('/register', 
    authController.validateUserData,
    authController.registerUser)

router.post('/login', 
    authController.validateUserData,
    authController.loginUser)

router.get('/verify/:tokenVerify', authController.verifyUser)

module.exports = router
