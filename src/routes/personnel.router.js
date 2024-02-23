"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
const router = require("express").Router();
/* -------------------------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");
const permission = require("../middlewares/permissions");

// URL: /personnel

router
  .route("/")
  .get(permission.isLogin, personnel.list)
  .post(permission.isAdmin, personnel.create);

router
  .route("/:id")
  .get(permission.isLogin, personnel.read)
  .put(permission.isAdmin, personnel.update)
  .patch(permission.isAdmin, personnel.update)
  .delete(permission.isAdmin, personnel.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
