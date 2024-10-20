const logger = require("../config/logger.config");
const request = require("../config/request.config.js");

/**
 * Input pipe for Morgan logger
 */
logger.stream = {
  write: function (message, encoding) {
    // remove last \n
    const messageClean = message.slice(0, -1);
    logger.http(messageClean);
  },
};

const useLoggers = (app) => {
  app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
  });
};

/**
 * Middleware function for verbose logging requests
 * @description Cautious: this function logs the request body
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const debugReq = (req, res, next) => {
  const reqMessage = `${new Date().toLocaleTimeString()}`;
  const reqData = request.getRequestInfo(req);
  logger.debug(reqMessage, reqData);
  next();
};

/**
 * Middleware functions for automatic and custom logging
 */
module.exports = logs = {
  /** Use a customized logger for every request */
  useLoggers,
  /** Middleware function for verbose logging any request you want */
  debugReq,
};