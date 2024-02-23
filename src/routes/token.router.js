"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
const router = require("express").Router();
/* -------------------------------------------------------------------------- */

const token = require("../controllers/token.controller");

// URL: /tokens

router.route("/").get(token.list).post(token.create);

router.route("/:id").get(token.read).delete(token.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
