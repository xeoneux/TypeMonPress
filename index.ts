import { Application } from "express"

import { json, urlencoded } from "body-parser"
import * as compression from "compression"
import * as cookieParser from "cookie-parser"
import * as cors from "cors"
import * as express from "express"
import * as helmet from "helmet"
import config from "./config/config"

class App {
    private app: Application

    constructor(config: object) {
        this.app = express()
        this.configure()
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
    }
}

new App(config).run()
