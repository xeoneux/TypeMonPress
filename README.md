# TypeMonPress

## Overview

A Boilerplate Starter Application For Building RESTful APIs Microservice in Node.js using Express and Mongoose in TypeScript. Helps you stay productive by following best practices and standards.

## Getting Started

Clone the repo:
```sh
git clone git@github.com:xeoneux/TypeMonPress.git
cd TypeMonPress
```

Install dependencies:
```sh
npm install
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start server
npm start

# Start debug server
npm run debug
```

Deployment:

```sh
# Compile to JS
1. npm run build

# Upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# Install production dependencies only
3. npm install --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

In production you need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html).

We recommend [PM2](http://pm2.keymetrics.io/) as it has several useful features like it can be configured to auto-start your services if system is rebooted.

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License
This project is licensed under the [MIT License](https://github.com/xeoneux/TypeMonPress/blob/master/LICENSE)
