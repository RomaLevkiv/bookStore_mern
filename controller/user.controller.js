const { userModel, statusValues } = require('../model/user.model')
const createControllerProxy = require('../helpers/controller.proxy')



class UserController {

    async writeToCart(req, res, next) {
        try {
            const  cart  = req.body.writeToCartArray
            const { userId } = req.tokenDecoded
            await userModel.writeToCart(userId, cart)
            res.status(201).json({message: 'write to cart'})
        } catch (error) {
            next(error)
        }
    }

    async getCart(req, res, next) {
        try {
            const { userId } = req.tokenDecoded
            const cart = await userModel.getCart(userId)
            res.status(200).json({message: "cart", cart})
                                    
        } catch (error) {
            next(error)
        }
    }

    


}

module.exports = createControllerProxy(new UserController())