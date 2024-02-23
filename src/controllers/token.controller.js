"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
//? Require(import) Token:
const Token = require("../models/token.model");

/* -------------------------------------------------------------------------- */
//? DeparTokentment Controller:
module.exports = {
  // GET:
  list: async (req, res) => {
    const data = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Token),
      data,
    });
  },

  // CRUD Processes:
  // POST
  create: async (req, res) => {
    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  // /:id -> GET
  read: async (req, res) => {
    const data = await Token.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  // /:id -> DELETE
  delete: async (req, res) => {
    const data = await Token.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });

    // const isDeleted = data.deletedCount >= 1 ? true : false;
    // res.status(isDeleted ? 204 : 404).send({
    //   error: !isDeleted,
    //   data,
    // });
  },
};
