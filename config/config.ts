import { config } from "dotenv"
import * as Joi from "joi"

config()

const schema = Joi.object({
    MONGO_HOST: Joi.string().required().description("Mongo DB Host URL"),
    MONGO_PORT: Joi.number().default(27017),
    NODE_ENV: Joi.string().allow(["development", "production"]).default("development"),
    PORT: Joi.number().default(1234),
}).unknown().required()

const { error, value: env } = Joi.validate(process.env, schema)

if (error) {
    throw new Error(`Config Validation Error: ${error.message}`)
}

export default {
    mongo: {
        host: env.MONGO_HOST,
        port: env.MONGO_PORT,
    },
    node: {
        env: env.NODE_ENV,
        port: env.PORT,
    },
}
