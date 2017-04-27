import * as express from "express"

import { Application } from "express"

class TypeMonPress {
    public app: Application

    constructor() {
        this.app = express()
    }

    public bootstrap() {
        this.app.listen(1234)
    }
}

const app = new TypeMonPress()

app.bootstrap()
