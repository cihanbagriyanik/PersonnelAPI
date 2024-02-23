"use strict";

const swaggerAutogen = require("swagger-autogen");
const packageJson = require("./package.json");

/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

/* -------------------------------------------------------------------------- */
//? $ npm i swagger-autogen
const document = {
  info: {
    // version: "1.0.0",
    version: packageJson.version,
    // title: "Personnel API",
    title: packageJson.title,
    // description: "Personnel Management API Service",
    description: packageJson.description,
    termsOfService: "http://www.clarusway.com",
    contact: { name: "Clarusway", email: "qadir@clarusway.com" },
    license: { name: "BSD License" },
  },

  host: ` ${HOST}:${PORT} `, //! arada bosluk olmasin

  basePath: "/",

  schemes: ["http", "https"],

  // JWT Settings:
  /*
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>",
    },
  },
  security: [{ JWT: true }],
  */

  definition: {
    // "Department":{
    //     "name":"ObjectId",
    //     require: true

    // }
    Department: require("./src/models/department.model").schema.obj,
    Personnel: require("./src/models/personnel.model").schema.obj,
  },
};

const routes = ["./index.js"];

const outputfile = "swagger.json";

/* -------------------------------------------------------------------------- */
//? Create JSON File

swaggerAutogen(outputfile, routes, document);

/* -------------------------------------------------------------------------- */
//* Her degisiklikte tekrar calistirmak lazim
//! $ node swagger.js
