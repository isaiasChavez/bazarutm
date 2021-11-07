import jwt from 'jsonwebtoken'
const authMid = function (req,res,next) {
/* 
  const token = req.header('x-auth-token')
  console.log("Token:", token)
  if (!token) {
   return res.status(Code_Unauthorized).json({ msg:MSG_UNAUTHORIZED});
  }
  try {
    const cifrado = jwt.verify(token, process.env.SECRETWORD); 
    req.user = cifrado.user; */
    next()
 /*  } catch (e) {
    res.status(Code_Unauthorized).json({ msg: "Algo fue mal" });
  } */
}
export default authMid