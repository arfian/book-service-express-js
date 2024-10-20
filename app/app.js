const express = require('express');
const env = require("dotenv").config().parsed;

const app = express()
const port = env.PORT

const api = require("./api/api.router");
const middleware = require("./middleware/middleware.index");
const logger = require("./config/logger.config");

middleware.logs.useLoggers(app);
middleware.security.useSecurity(app);
api.useRouters(app);
middleware.errorHandler.useErrorHandler(app, logger);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));