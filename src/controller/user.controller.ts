import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserController ={

  addUsers:async (req,res) =>{
    try
    {   
      res.json({ 
        msg:"Si",
        token:"1" })
        
      } catch (e) {
        
      }
    }
  }

export default UserController

