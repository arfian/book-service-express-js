const express = require("express");
const middleware = require("../../middleware/middleware.index");
const service = require("./book.service");

const { control } = middleware.controller;
const { getId, getUserId, getBody } = middleware.validations;
const { guardUser } = middleware.authentication;

/**
 * Defines the routes for the credentials endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
module.exports = express
  .Router()
  .get("/:id", guardUser, getId, getUserId, control(service.bookById));