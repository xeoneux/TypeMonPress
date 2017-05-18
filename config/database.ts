import bluebird = require("bluebird")
import mongoose = require("mongoose")

import config from "./config"

mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } })

mongoose.Promise = bluebird

export default mongoose
