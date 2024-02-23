"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
    $ npm i morgan
    $ npm i swagger-autogen
    $ npm i swagger-ui-express
    $ npm i redoc-express
*/

const express = require("express");
const app = express();

/* -------------------------------------------------------------------------- */
// * Required Modules:
//? envVariables to process.env:
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
// //? LOG
// // $ npm i morgan
// const morgan = require("morgan");
// // console.log(morgan);

// //?  LOG Kayit Tutma
// const fs = require("node:fs"); // file system module // not necesarry npm i came with together node.js

// const now = new Date();
// const today = now.toISOString().split("T")[0];

// // ? Write LOG to file:
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
//   })
// );

/* -------------------------------------------------------------------------- */
//? swagger-ui-express
//$ npm i swagger-ui-express

// swaggerUi import
const swaggerUi = require("swagger-ui-express");
// swagger json import
const swaggerJson = require("./swagger.json");

app.use(
  "/docs/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

/* -------------------------------------------------------------------------- */
//? redoc
// $ npm i redoc-express

// import
const redoc = require("redoc-express");

app.use("/docs/json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});

app.use(
  "/docs/redoc",
  redoc({
    specUrl: "/docs/json",
    title: "API Docs",
  })
);

/* -------------------------------------------------------------------------- */
//? asyncErrors to errorHandler:
require("express-async-errors");

/* -------------------------------------------------------------------------- */
//? Configrations:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* -------------------------------------------------------------------------- */
//? Middlerware:
// Accept JSON:
app.use(express.json());

// SessionsCookies:
app.use(
  require("cookie-session")({
    secret: process.env.SECRET_KEY || "write_random_chars_in_here",
  })
);

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* -------------------------------------------------------------------------- */
//? Routes:
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API", // INSIDE OBJE
    session: req.session,
    isLogin: req.isLogin,
    api: {
      documents: {
        swagger: "http://127.0.0.1:8000/docs/swagger",
        redoc: "http://127.0.0.1:8000/docs/redoc",
        json: "http://127.0.0.1:8000/docs/json",
      },
      contact: "clarusway.com",
    },
  });
});

//* /authentication
app.use(require("./src/middlewares/authentication"));

//* /departments
app.use("/departments", require("./src/routes/department.router"));

//* /personnels
app.use("/personnels", require("./src/routes/personnel.router"));

//* /tokens
app.use("/tokens", require("./src/routes/token.router"));

//* /auth
app.use("/auth", require("./src/routes/auth.router"));

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
//? errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* -------------------------------------------------------------------------- */
//? RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */
//? Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
