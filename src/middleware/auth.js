"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var Code_Unauthorized = require('../../types').Code_Unauthorized;
var MSG_UNAUTHORIZED = require('../../types/responses').MSG_UNAUTHORIZED;
var authMid = function (req, res, next) {
    /*
      const token = req.header('x-auth-token')
      console.log("Token:", token)
      if (!token) {
       return res.status(Code_Unauthorized).json({ msg:MSG_UNAUTHORIZED});
      }
      try {
        const cifrado = jwt.verify(token, process.env.SECRETWORD);
        req.user = cifrado.user; */
    next();
    /*  } catch (e) {
       res.status(Code_Unauthorized).json({ msg: "Algo fue mal" });
     } */
};
exports.default = authMid;
