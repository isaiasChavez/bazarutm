import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validationResult from 'express-validator'

class AuthController {
  constructor () {}
  public async authenticateUser (req: Request, res: Response) {
    res.json({
      msg: '',
      token: '1'
    })
  }
  public async authenticatedUser (req: Request, res: Response) {
    res.json({
      msg: '',
      token: '1'
    })
  }
  public async createUser (req: Request, res: Response) {
    res.json({
      msg: '',
      token: '1'
    })
  }
}

export default AuthController
