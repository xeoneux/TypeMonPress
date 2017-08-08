import { existsSync, mkdirSync } from "fs";
import winston = require("winston");

if (!existsSync("log")) mkdirSync("log");

winston.setLevels(winston.config.syslog.levels);
winston.addColors(winston.config.syslog.colors);

const logger = new winston.Logger({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      colorize: false,
      filename: "./log/log",
      handleExceptions: true,
      json: true,
      level: "info",
      maxFiles: 5,
      maxsize: 1024 * 1024 * 10 // 10 MB
    }),
    new winston.transports.Console({
      colorize: true,
      handleExceptions: true,
      json: false,
      level: "debug"
    })
  ]
});

export default logger;
