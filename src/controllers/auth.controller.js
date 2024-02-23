"use strict";
/* --------------------------------------------------------------------------
    * EXPRESS - Personnel API
----------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
//? Require(import):
const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

/* -------------------------------------------------------------------------- */
//? Auth Controller:
module.exports = {
  //? LOGIN:
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if ((username || email) && password) {
      //? girilen veriler db ile eslesiyormu?
      const user = await Personnel.findOne({ $or: [{ username }, { email }] });

      //? boyle bir kullanici var ise password kontrol et
      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          //? Token olustur
          // Once kullanici icin daha once token olusturulmus mu?
          let tokenData = await Token.findOne({ userId: user._id });

          // Yoksa token olustur
          if (!tokenData) {
            let tokenKey = passwordEncrypt(user._id + Date.now()); //uniq bir deger olustur

            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }

          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("You are not Active!!!");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error(
          "Please enter Username / Email or Password is wrong!!!"
        );
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter Username or Email and Password");
    }
  },

  //? LOGOUT:
  logout: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ")[1] : null;
    // console.log(tokenKey);

    const tokenData = await Token.deleteOne({ token: tokenKey });

    // res.status(tokenData.deletedCount ? 204 : 404).send({})

    if (tokenData.deletedCount >= 1) {
      res.send({
        error: false,
        message: "Logout OK",
        data: tokenData,
      });
    } else {
      res.send({
        error: false,
        message: "It is already Logout",
        data: tokenData,
      });
    }
  },
};
