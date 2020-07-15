const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const authRouter = require("../route/auth")
const bookRouter = require("../route/book")
const userRouter = require("../route/user")
const orderRouter = require("../route/order")

const PORT = process.env.PORT || 8080

class AppServer {
    constructor() {
        this.server = null
    }

    async start() {
        this.initServer()
        this.initMiddleware()
        this.initRoutes()
        await this.initDatabase()
        this.startListening()
    }

    initServer() {
        this.server = express()
    }

    initMiddleware() {
        this.server.use(express.urlencoded())
        this.server.use(express.json({ extended: true }))
        this.server.use(morgan('dev'))
        // if(process.env.NODE_ENV === "production") {
        //     this.server.use(express.static(path.join(__dirname, "client", "build")))
        // }
    }

    initRoutes() {
        this.server.use('/', authRouter)
        this.server.use('/', bookRouter)
        this.server.use('/', userRouter)
        this.server.use('/', orderRouter)
        
        if(process.env.NODE_ENV === "production") {
            this.server.use(express.static(path.join(__dirname,  "..", "client", "build")))
            this.server.get("*", (req, res) => {
                res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
            })
        }
    }

    async initDatabase() {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        } catch (error) {
            console.log("Mongo_DB connect failed", error)          
        }
    }

    startListening() {
        this.server.listen(PORT, () => {
            console.log('server start on port', PORT);
            
        })
    }
}

module.exports = AppServer