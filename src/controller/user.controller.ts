import { Request, Response } from 'express'
import UserService from '../services/user.service';
import {ServerResponse} from '../../types';
import {CreateUserDTO} from '../services/user.dto'
import { User } from 'src/database/Entities/user.entity';
class UserController {
  userService: UserService;
  constructor () {
    this.userService = new UserService();
  }
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body
      const newUser:CreateUserDTO = {
          email:data.email,
          avatar:"",
          active:false,
          birthday:new Date(),
          genero:false,
          password:'password',
          nickname:"Something",
      }
      this.userService.createUser(newUser)

      const response:ServerResponse ={
        status: 400,
        data:null,
        msg:"ok"
      }

      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg:"Error!"
      })

    }
  }
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
    
      
      console.log(req.body)

      const response:ServerResponse ={
        status: 400,
        data:null,
        msg:"ok"
      }

      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg:"Error!"
      })

    }
  }
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
    
      console.log(req.params)
      const userEmail:string = req.params.email

      if (!userEmail) {
        throw new Error("Falta el email");
      }
      const status = await this.userService.deleteUser(userEmail)
      const response:ServerResponse ={
        status:status.status,
        data:null,
        msg:status.msg
      }
      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg:"Error!"
      })

    }
  }
}

export default UserController
