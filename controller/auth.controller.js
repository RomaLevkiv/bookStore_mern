const Joi = require('joi')
const bcrypt = require('bcryptjs')
const createControllerProxy  = require('../helpers/controller.proxy')
const { userModel, statusValues } = require('../model/user.model')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../helpers/error.constructor')
const uuid = require('uuid')
const path = require('path')
const sgMail = require("@sendgrid/mail")
require("dotenv").config(path.join(__dirname, "../.env"))



class AuthController {
        
    
    validateUserData(req, res, next) {
        try {
            const userRules = Joi.object({
                email: Joi.string().required().email(),
                password: Joi.string().required().min(6)
            })
            const validationResult = Joi.validate(req.body, userRules)
            
            if(validationResult.error) {
                const message = validationResult.error.details[0].message                
                return res.status(400).json({message})    
            }
            next()
            
        } catch (error) {
            next(error)
        }
    }

    async authorize(req, res, next) {
        try {
            const token = req.headers.authorization.replace("Bearer ", "")
            const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
            req.tokenDecoded = tokenDecoded            
            const user = await userModel.findUserByToken(token)
            if(!user){
                throw new Error()
            }
            next()
            
        } catch (error) {
            const ERR = new UnauthorizedError("Token is not valid!")
            const { status, message } = ERR
            return res.status(status).json({message})            
        }
       
    }

    async registerUser(req, res, next) { 
        try {
            const { email, password } = req.body
            const user = await userModel.findUserByEmail(email)
           
            if(user) {
                return  res.status(400).json({message: "such user already exist"})
            }

            const hashedPassword = bcrypt.hashSync(password, 10)
            const tokenVerify = uuid.v4()
            const status = statusValues.NOT_VERIFY
            const newUser = { 
                email,
                password: hashedPassword, 
                token: null,
                tokenVerify,
                status
            }
            await userModel.addUser(newUser)
            await this.sendVerificationEmail( tokenVerify, email )
            res.status(201).json({message: "User created. Verify user on your email"})

        } catch (error) {
            next(error)    
        }
    }

    async sendVerificationEmail( tokenVerify, toEmail ) {
        console.log("sendVerificationEmail", tokenVerify, toEmail)
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        console.log("SENDGRID_API_KEY", process.env.SENDGRID_API_KEY)
        
        const verificationLink = `${process.env.SERVER_BASE_URL}/verify/${tokenVerify}` 
        console.log("verificationLink", verificationLink);
        const result = await sgMail.send({
            to: toEmail,
            from: process.env.FROM_EMAIL,
            subject: "Please, verify your contact",
            html: `<a href=${verificationLink}>!Go to verification!</a>`
        })
        console.log(result);
        
    }

    async verifyUser(req, res, next) {
        try {
            const { tokenVerify } = req.params
            console.log("tokenVerify", tokenVerify)
            
            const updContact = await userModel.updateUserByVerificationToken(tokenVerify)
            if(!updContact) {
                throw new NotFound('Such user not found!')
            }
            return res.status(200).send({message: "User successfully verified!"})
        } catch (error) {
            next(error)
        }
    }


    async loginUser(req, res, next) {
        const { email, password } = req.body
        const candidate = await userModel.findUserByEmail(email)
        if(!candidate) {
            return res.status(400)
                        .json({message: "such user doesn't exist"})
        }
        if(candidate.tokenVerify) {
            return res.status(400)
                        .json({message: `User is not verified. Please, use link on your email`})
        }
        const match = await bcrypt.compare(password, candidate.password)
        if(!match){
            return res.status(400)
                        .json({message: "password isn't correct"})
        }
        const token = jwt.sign({userId: candidate.id}, 
                                process.env.JWT_SECRET,
                                {expiresIn: '1h'})
        await userModel.updateToken(candidate._id, token) 
        res.status(200).json({hideMessage: "You entered!", token, userId: candidate.id})
    }
}

module.exports = createControllerProxy(new AuthController())