const {Router} = require('express')
const router = Router()
const bookController = require('../controller/book.controller')
const authController = require('../controller/auth.controller')

router.post('/create_book', 
    bookController.validateBookData,
    authController.authorize,
    bookController.addBook
)

router.get('/books', bookController.getBooks)

module.exports = router