import Joi = require("joi");
import { config } from "dotenv";

config();

const schema = Joi.object({
  MONGO_HOST: Joi.string().default("mongodb://localhost/TypeMonPress"),
  MONGO_PORT: Joi.number().default(27017),
  NODE_ENV: Joi.string()
    .allow(["test", "development", "production"])
    .default("development"),
  PORT: Joi.number().default(1234)
})
  .unknown()
  .required();

const { error, value: env } = Joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

const mongo = { host: env.MONGO_HOST, port: env.MONGO_PORT };
const node = { env: env.NODE_ENV, port: env.PORT };

export { mongo, node };
