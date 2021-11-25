import { Request, Response } from 'express'
import UserService from './user.service'
import { ServerResponse } from '../../types'
import { CreateUserDTO } from './user.dto'
import { typesUser } from '../../types'
import { Role } from '../role/role.entity'
class UserController {
  userService: UserService
  constructor () {
    this.userService = new UserService()
  }
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateUserDTO = req.body
      console.log({data})
      if (
        !data.name ||
        !data.birthday ||
        data.gender===null ||
        !data.password ||
        !data.name ||
        !data.lastname ||
        !data.type
      ) {
        res.status(401).json({
          msg: 'Faltan datos!'
        })
        return
      }


      const role:Role = await Role.findOne({ 
        where:{
          name:typesUser.user
        }
      })

      const newUser: CreateUserDTO = {
        email: data.email,
        birthday: new Date(),
        gender: data.gender,
        password: data.password,
        name: data.name,
        lastname: data.lastname,
        type: typesUser.user,
        role

      }

      await this.userService.createUser(newUser)

      const response: ServerResponse = {
        status: 400,
        data: null,
        msg: 'ok'
      }

      console.log("Vamos de nuevo")
      res.status(400).json(response)

    } catch (e) {
      res.status(500).json({
        msg: 'Error!'
      })
    }
  }
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body)

      const response: ServerResponse = {
        status: 400,
        data: null,
        msg: 'ok'
      }

      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg: 'Error!'
      })
    }
  }
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.params)
      const userEmail: string = req.params.email

      if (!userEmail) {
        throw new Error('Falta el email')
      }
      const status = await this.userService.deleteUser(userEmail)
      const response: ServerResponse = {
        status: status.status,
        data: null,
        msg: status.msg
      }
      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg: 'Error!'
      })
    }
  }
}

export default UserController
