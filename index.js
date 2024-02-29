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

// morgan-logger:
// app.use(require("./src/middlewares/logger")); //*IN Comment coz of Deployment

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
        swagger: "http://127.0.0.1:8000/documents/swagger",
        redoc: "http://127.0.0.1:8000/documents/redoc",
        json: "http://127.0.0.1:8000/documents/json",
      },
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

//*  document
app.use("/documents", require("./src/routes/document"));

/* -------------------------------------------------------------------------- */
//? errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* -------------------------------------------------------------------------- */
//? RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* -------------------------------------------------------------------------- */
//? Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
