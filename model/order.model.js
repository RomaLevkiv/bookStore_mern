const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    books: [
        {
            bookId: {
                type: ObjectId,
                ref: 'Book',
                required: true
            },
            count: {
                type: Number,
                required: true,
                default: 1
            }, 
            total: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

orderSchema.statics.addOrder = addOrder
orderSchema.statics.getUserOrders = getUserOrders
orderSchema.statics.deleteOrderItem = deleteOrderItem

async function addOrder( newOrder ) {
    return await this.create( newOrder )
}

async function getUserOrders( userId ) {
    return await this.find( { userId } ).populate("books.bookId", "title author")
}

async function deleteOrderItem(_id) {
    return await this.deleteOne({_id})
}

module.exports = mongoose.model( "Order", orderSchema )

