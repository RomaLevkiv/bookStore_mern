const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types


const statusValues = {
    ACTIVE: "active",
    NOT_VERIFY: "notVeryfy"
}


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: { type: String },
    tokenVerify: { type: String },
    status: {
        type: String,
        enum: [
            statusValues.ACTIVE,
            statusValues.NOT_VERIFY
        ],
        required: true
    },

    cart: [
        {
            count: {
                type: Number,
                required: true,
                default: 1
            },
            bookId: {
                type: ObjectId,
                ref: 'Book',
                required: true
            }
        }
    ]
})

userSchema.statics.addUser = addUser
userSchema.statics.findUserByEmail = findUserByEmail
userSchema.statics.findUserByToken = findUserByToken
userSchema.statics.updateToken = updateToken
userSchema.statics.updateUserByVerificationToken = updateUserByVerificationToken
userSchema.statics.writeToCart = writeToCart
userSchema.statics.getCart = getCart
userSchema.statics.findUserById = findUserById


async function findUserByEmail(email) {
    return this.findOne({ email })
}

async function addUser(newUser) {
    return this.create(newUser)
}

async function findUserByToken(token) {
    return this.findOne({ token })
}

async function updateToken(userId, token) {
    return this.findOneAndUpdate({ _id: userId }, { token }, { new: true })
}

async function writeToCart(userId, cart) {
    return await this.findOneAndUpdate({_id: userId}, {cart}, {new: true})
}

async function getCart(userId) {
    const user = await this.findOne({_id: userId})
    return user.cart
}

async function updateUserByVerificationToken (tokenVerify) {
    return this.findOneAndUpdate({tokenVerify}, {
        tokenVerify: null,
        status: statusValues.ACTIVE
    },
        {new: true}
    )
}

async function findUserById(userId) {
    console.log("fUBI");
    
    return this.findOne({ _id: userId })
}

module.exports = { 
    userModel: mongoose.model("User", userSchema),
    statusValues
}

