import { Request, Response } from 'express'
import UserService from './user.service'
import { ServerResponse } from '../../types'
import { CreateUserDTO, GetUserLoggedProfileDTO, GetUserProfileDTO, UpdateUserDTO } from './user.dto'
import { validateOrReject } from 'class-validator'
import { Controller } from '../interfaces/service.interface'

class UserController extends Controller {
  private userService: UserService
  private firsValueRes = { status: 400, data: null, msg: 'ok' }
  constructor () {
    super()
    this.userService = new UserService()
  }
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes
      const data = new CreateUserDTO(req.body)
      await validateOrReject(data)
        .then(async () => {
          response = await this.userService.create(data)
        })
        .catch(e => {
          response.msg = this.eH.validationHandler('createUser', e)
        })
      res.status(response.status).json(response)
      return
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('createUser', e) })
    }
  }
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes
      const data = new UpdateUserDTO(req.body)
      await validateOrReject(data)
        .then(async () => {
          console.log("OK")
          // response = await this.userService.update(data)
        })
        .catch(e => {
          response.msg = this.eH.validationHandler('updateUser', e)
        })
      res.status(response.status).json(response)
      return
    } catch (e) {
      res.status(500).json({
        msg: 'Error!'
      })
    }
  }

  public getUserLoggedProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {


      let response: ServerResponse = this.firsValueRes
      const uuid: string = req.body.uuidauth
      console.log({uuid})
      const getProfileDTO = new GetUserLoggedProfileDTO(uuid)

      await validateOrReject(getProfileDTO)
        .then(async () => {
          response = await this.userService.getUserLoggedProfile(getProfileDTO)
        })
        .catch(e => {
          console.log("ERROR")
          console.log({e})
          response.msg = this.eH.validationHandler('getUserLoggedProfile', e)
        })
      res.status(200).json(response)
      return

    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getUserLoggedProfile', e) })
    }
  }
  public getUserProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes
      const email: string = req.params.email

      const getProfileDTO = new GetUserProfileDTO(email)
      await validateOrReject(getProfileDTO)
        .then(async () => {
          response = await this.userService.getUserProfile(getProfileDTO)
        })
        .catch(e => {
          response.msg = this.eH.validationHandler('getUserProfile', e)
        })
      res.status(response.status).json(response)
      return
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getUserProfile', e) })
    }
  }

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.params)
      const userEmail: string = req.params.email

      if (!userEmail) {
        throw new Error('Falta el email')
      }
      const status = await this.userService.delete(userEmail)
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
