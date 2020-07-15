const orderModel = require('../model/order.model')
const { userModel } = require('../model/user.model')
const bookModel = require('../model/book.model')
const createControllerProxy = require('../helpers/controller.proxy')
const sgMail = require('@sendgrid/mail')

class OrderController {

    async addOrder(req, res, next) {
        try {            
            
            const { books, totalPrice } = req.body
            const { userId } = req.tokenDecoded
    
            const newOrder = {
                books,
                totalPrice,
                userId
            }

            await orderModel.addOrder(newOrder)
            
            await this._sendOrderMessage(books, totalPrice, userId)

            return res.status(201).json({message: "Order added"})

        } catch (error) {
            next(error)
        }
    }

    async _sendOrderMessage(books, totalPrice, userId) {

        const user = await userModel.findUserById(userId)
        const { email } = user

        const orderBookList = await Promise.all( books.map( async(item, index) => {
            const book =  await bookModel.getBookById(item.bookId)
            return `
                <div>
                    <p>${index + 1}. Title: ${book.title}</p>
                    <p>Author: ${book.author}</p>
                    <p>Count: ${item.count}</p>
                    <p>Price: ${item.total}</p>
                    <hr/>
                </div>
            `
        }))
            
        const htmlOrder = (
            `<div>
                <h1>Order by ${email}</h1>
                ${orderBookList}
                <p>Total price: $ ${totalPrice}</p>
            </div>`
        )

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const letter = await sgMail.send({
            to: process.env.FROM_EMAIL,
            from:  email,
            subject: "Book Order",
            html: htmlOrder
        })
    
    }

    async getUserOrders( req, res, next ) {
        try {
            const { userId } = req.tokenDecoded
            const orders = await orderModel.getUserOrders(userId)            
            res.status(200).json({message: "user's orders", orders})    
        } catch (error) {
            next(error)
        }

    }

    async deleteOrderItem (req, res, next) {
        try {
            const {orderItemId} = req.body
            await orderModel.deleteOrderItem(orderItemId)
            next()
        } catch (error) {
            next(error)
        }
    }



}

module.exports = createControllerProxy(new OrderController())