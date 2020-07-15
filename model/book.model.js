const {Schema, model, Types} = require('mongoose')

const bookSchema = new Schema ({
    title:{
        type: String, 
        required: true
    }, 
    author:{
        type: String,
        required: true  
    }, 
    price: {
        type: Number,
        required: true
    },
    coverImage:{
        type: String,
        required: true
    },
    addedByUser: {
        type: Types.ObjectId,
        ref: 'User'
    }
})
bookSchema.statics.getBooks = getBooks
bookSchema.statics.addBook = addBook
bookSchema.statics.getBookById = getBookById

async function addBook(newBook) {
    return this.create(newBook)
}

async function getBooks() {
    return this.find()
}

async function getBookById(bookId) {
    return this.findOne({_id: bookId})
}


module.exports = model('Book', bookSchema)