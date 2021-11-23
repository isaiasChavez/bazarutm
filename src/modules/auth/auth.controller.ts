import { Request, Response } from 'express'
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
  
}

export default AuthController
