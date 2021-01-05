const jwt = require('jsonwebtoken')
const {Code_Unauthorized} = require('../types')
const {MSG_UNAUTHORIZED} = require('../types/responses')
module.exports = function (req,res,next) {

  const token = req.header('x-auth-token')
  console.log("Token:", token)
  if (!token) {
   return res.status(Code_Unauthorized).json({ msg:MSG_UNAUTHORIZED});
  }
  try {
    const cifrado = jwt.verify(token, process.env.SECRETWORD); 
    req.user = cifrado.user;
    if (cifrado.recover) {
      req.recover = cifrado.user;
    }
    next()
  } catch (e) {
    res.status(Code_Unauthorized).json({ msg: "Algo fue mal" });
  }
}