import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validationResult from 'express-validator'


class AuthController {

  authenticateUser = async (req,res) =>{
    
    res.json({ 
           msg:"",
           token:"1" })
    
  }
  authenticatedUser = async (req, res) => {
   res.json({ 
         msg:"",
         token:"1" })
}
createUser = async (req, res) => {
  res.json({ 
         msg:"",
         token:"1" })
};
}


export default AuthController





