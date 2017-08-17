import { mongo, node } from "../../config";
import { existsSync, mkdirSync } from "fs";
import { config, Logger, addColors, setLevels, transports } from "winston";

setLevels(config.syslog.levels);
addColors(config.syslog.colors);

if (!existsSync("logs")) mkdirSync("logs");

const consoleTransport = new transports.Console({
  colorize: true,
  handleExceptions: true,
  json: false,
  level: "debug"
});

const fileTransport = new transports.File({
  colorize: false,
  filename: "logs/log",
  handleExceptions: true,
  json: true,
  level: "info",
  maxFiles: 5,
  maxsize: 1024 * 1024 * 10 // 10 MB
});

let logger = new Logger();

if (node.env === "test")
  logger = new Logger({ exitOnError: false, transports: [fileTransport] });
if (node.env === "development")
  logger = new Logger({ exitOnError: false, transports: [consoleTransport] });
if (node.env === "production")
  logger = new Logger({
    exitOnError: false,
    transports: [consoleTransport, fileTransport]
  });

export { logger };
