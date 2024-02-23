"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
const router = require("express").Router();
/* -------------------------------------------------------------------------- */

const auth = require("../controllers/auth.controller");

// URL: /auth

router.post("/login", auth.login);
// router.all("/logout", auth.logout); // all methods swagger gormez
router.get("/logout", auth.logout);

/* -------------------------------------------------------------------------- */
module.exports = router;
