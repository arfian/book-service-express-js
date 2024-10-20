const express = require("express"),
  swaggerUi = require("swagger-ui-express");

const authRouter = require("./auth/auth.router");
// const bookRouter = require("./book/books.router");

const middleware = require("../middleware/middleware.index");
const swagger = require("../config/swagger.config");
// const { guardUser } = middleware.authentication;
const { debugReq } = middleware.logs;
const { hashCredentials } = middleware.security;

const useRouters = (app) => {
  app.use(express.json());
  app.get("/", (req, res) => res.send("Book API"));
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swagger.specs)
  );
  const apiRouters = getApiRouters();
  app.use('/api',apiRouters);
};

const getApiRouters = () => {
  const apiRouters = express.Router();
  apiRouters.use("/auth", hashCredentials, debugReq, authRouter);
//   apiRouters.use("/book", guardUser, bookRouter);
  return apiRouters;
};

/**
 * Defines main routes for the API, attaching controllers and middleware.
 */
module.exports = api = {
  /** Configure middleware and sets routes for the API endpoints */
  useRouters,
};