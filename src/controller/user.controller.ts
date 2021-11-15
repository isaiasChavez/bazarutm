import {Request,Response} from 'express';


class UserController{


  constructor(){
   }
  public addUsers = async (req:Request,res:Response):Promise<void> =>{
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

