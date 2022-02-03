import { Request, Response } from 'express'
import { LoginDTO } from './auth.dto'
import AuthService from './auth.service'
import { validateOrReject } from 'class-validator'
import { ServerResponse, ServiceReponse } from '../../types'
import { Controller } from '../interfaces/service.interface'

class AuthController extends Controller {
  private authService: AuthService
  constructor () {
    super()
    this.authService = new AuthService()
  }

  
  public validateTokenSesion = async (req: Request, res: Response): Promise<void> => {

    try {
      
      const {token} = req.params

      const response = this.authService.validateTokenSesion(token)

      res.status(this.HTTPResponses.Ok).json(response)      
      

    } catch (error) {

      res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler('validateTokenSesion', error) })

    }


  }

  public logIn = async (req: Request, res: Response): Promise<void> => {
    try {
      
      let response: ServerResponse = {
        msg: '',
        status: 500,
        data: null
      }
      
      const data = new LoginDTO(req.body)

      try {
        await validateOrReject(data)

      } catch (error) {
        response.msg = this.eH.validationHandler('logIn', error)
        res.status(this.HTTPResponses.BadRequest).json(response)
        return
      }

      response = await this.authService.verifyUser(data)
      res.status(this.HTTPResponses.Ok).json(response)

    } catch (error) {
      res.status(this.HTTPResponses.InternalError).json({ msg: this.eH.genericHandler('logIn', error) })
    }
  }
  public logOut = async (req: Request, res: Response) => {
    try {
      const data = new LoginDTO(req.body)

      res.json({
        msg: '',
        token: '1'
      })
    } catch (error) {
      console.log({ error })
      res.status(500).json({ msg: this.eH.genericHandler('logIn', error) })
    }
  }
}

export default AuthController
