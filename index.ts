import { Application } from "express"

import { json, urlencoded } from "body-parser"
import compression = require("compression")
import cookieParser = require("cookie-parser")
import cors = require("cors")
import express = require("express")
import validator = require("express-validator")
import helmet = require("helmet")

import config from "./config/config"
import database from "./config/database"
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

        app.use(compression())
        app.use(cookieParser())
        app.use(cors())
        app.use(json())
        app.use(helmet())
        app.use(urlencoded({ extended: true }))
        app.use(validator())

        app.use(router)
    }

    private database() {
        database.connection.on("error", () => {
            throw new Error(`Unable to Connect to Database: ${config.mongo.host} on Port ${config.mongo.port}`)
        })
    }
}

new App(config).run()
