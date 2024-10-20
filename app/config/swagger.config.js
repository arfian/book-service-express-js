const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Skill Test API with Swagger",
      version: "1.0.0",
      description: "CRUD Book APIs",
      contact: {
        name: "Arfian Bagus",
        email: "arfianbagus@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./app/api/auth/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = swagger = { specs };