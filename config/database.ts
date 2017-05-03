import { connect, connection } from "mongoose"
import config from "./config"

connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } })

connection.on("error", () => {
    throw new Error(`Unable to Connect to Database: ${config.mongo.host} on Port ${config.mongo.port}`)
})
