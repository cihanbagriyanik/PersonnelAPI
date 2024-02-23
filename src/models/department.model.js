"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* -------------------------------------------------------------------------- */
//? Department Schema
const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "departments",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = mongoose.model("Department", DepartmentSchema);
