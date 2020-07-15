const bookModel = require('../model/book.model')
const createControllerProxy = require('../helpers/controller.proxy')
const Joi = require('joi')


class BookController {

    validateBookData(req, res, next) {

        const bookRules = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            price: Joi.number().required(),
            coverImage: Joi.string().required()
        })
        const validationResult = Joi.validate(req.body, bookRules)
        if (validationResult.error) {
            const message = validationResult.error.details[0].message
            return res.status(400).json({ message })
        }
        next()
    }



    async getBooks(req, res, next) {
        try {
            const books = await bookModel.getBooks()
            return res.status(200).json({ books, message: "books" })    
        } catch (error) {
            next(error)
        }
    }


    async addBook(req, res, next) {
        try {
            const newBook = {
                ...req.body,
                addedByUser: req.tokenDecoded.userId
            }
            await bookModel.addBook(newBook)
            return res.status(201).json({ hideMessage: "book created" })

        } catch (error) {
            next(error)
        }
    }



}

module.exports = createControllerProxy(new BookController())