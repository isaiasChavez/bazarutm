import { Router } from 'express'
import authMid from '../../middleware/auth.middleware'
import UserController from './user.controller'
import {RouterInterface,Middleware} from '../../types'
class UserRoutes implements RouterInterface {
  public router: Router
  controller: UserController
  globalMidleware:Middleware[]= [authMid]

  constructor () {
    this.router = Router()
    this.controller = new UserController()
    this.config()
  }
  private config = (): void => {
    this.router.post('/',this.globalMidleware, this.controller.createUser)
    this.router.put('/:email',this.globalMidleware, this.controller.updateUser)
    this.router.delete('/:email',this.globalMidleware, this.controller.deleteUser)
  }
}

export default new UserRoutes().router
