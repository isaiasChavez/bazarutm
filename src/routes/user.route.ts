import { Router } from 'express'
import authMid from '../middleware/auth'
import UserController from '../controller/user.controller'

class UserRoutes {
  public router: Router
  protected controller: UserController

  constructor () {
    this.router = Router()
    this.controller = new UserController()
    this.config()
  }
  private config (): void {
    this.router.post('/', authMid, this.controller.addUsers)
  }
}

export default new UserRoutes().router
