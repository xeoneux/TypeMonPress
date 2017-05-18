import { Application } from "express"

import bluebird = require("bluebird")
import bodyParser = require("body-parser")
import compression = require("compression")
import cookieParser = require("cookie-parser")
import cors = require("cors")
import express = require("express")
import helmet = require("helmet")
import mongoose = require("mongoose")
import validator = require("express-validator")

import config from "./config"
import router from "./routes"

class App {
    private app: Application

    constructor(config: object) {
        this.app = express()
        this.configure()
        this.database()
    }

    public run() {
        this.app.listen(1234)
    }

    private configure() {
        const app = this.app

        app.use(cors())
        app.use(helmet())
        app.use(compression())
        app.use(cookieParser())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(validator())

        app.use(router)
    }

    private database() {
        mongoose.Promise = bluebird
        mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } })
        mongoose.connection.on("error", () => {
            throw new Error(`Unable to Connect to Database: ${config.mongo.host} on Port ${config.mongo.port}`)
        })
    }
}

new App(config).run()
