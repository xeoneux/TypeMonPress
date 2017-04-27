import * as express from "express"

import { Application } from "express"

import config from "./config/config"

class App {
    private app: Application

    constructor(config: object) {
        this.app = express()
    }

    public run() {
        this.app.listen(1234)
    }
}

new App(config).run()
