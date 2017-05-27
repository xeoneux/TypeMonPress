import bluebird = require("bluebird")
import bodyParser = require("body-parser")
import compression = require("compression")
import connectMongo = require("connect-mongo")
import cookieParser = require("cookie-parser")
import cors = require("cors")
import express = require("express")
import helmet = require("helmet")
import mongoose = require("mongoose")
import morgan = require("morgan")
import session = require("express-session")
import validator = require("express-validator")

import config from "./config"
import router from "./routes"

// Database
mongoose.Promise = bluebird
mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on("error", () => {
    throw new Error(`Unable to Connect to Database: ${config.mongo.host} on Port ${config.mongo.port}`)
})

// Configure
const app = express()

if (config.node.env === "development") {
    app.use(morgan("dev"))
}

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())

const MongoStore = connectMongo(session)
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
}))
app.use(router)

app.listen(1234)
