import winston = require("winston")

export const logger = new winston.Logger({
    exitOnError: false,
    transports: [
        new winston.transports.DailyRotateFile({
            colorize: false,
            datePattern: "yy-MM-dd.",
            filename: "../log/.log",
            handleExceptions: true,
            json: true,
            level: "info",
            maxFiles: 5,
            maxsize: 5242880, // 5 MB
            prepend: true,
        }),
        new winston.transports.Console({
            colorize: true,
            handleExceptions: true,
            json: false,
            level: "debug",
        }),
    ],
})
