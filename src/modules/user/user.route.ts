import { Router } from 'express'
import authMid from '../../middleware/auth'
import UserController from './user.controller'

class UserRoutes {
  public router: Router
  protected controller: UserController

  constructor () {
    this.router = Router()
    this.controller = new UserController()
    this.config()
  }
  private config (): void {
    this.router.post('/', authMid, this.controller.createUser)
    this.router.put('/', authMid, this.controller.updateUser)
    this.router.delete('/:email', authMid, this.controller.deleteUser)
  }
}

export default new UserRoutes().router
