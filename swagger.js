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
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    termsOfService: "http://www.clarusway.com",
    contact: { name: "Clarusway", email: "qadir@clarusway.com" },
    license: { name: "BSD License" },
  },

  host: ` ${HOST}:${PORT} `,

  basePath: "/",

  schemes: ["http", "https"],

  definition: {
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
