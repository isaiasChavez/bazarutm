import { Router } from 'express'
import authMid from '../../middleware/auth.middleware'
import getUser from '../../middleware/getUser.middlesare'
import UserController from './user.controller'
import {RouterInterface,Middleware} from '../../types'
class UserRoutes implements RouterInterface {
  public router: Router
  controller: UserController
  globalMidleware:Middleware[]= [authMid]
  route:string ='/api/user'
  constructor () {
    this.router = Router()
    this.controller = new UserController()
    this.config()
    
  }
  private config = (): void => {
    this.router.post('/', this.controller.createUser)
    this.router.get('/',this.globalMidleware, this.controller.getUserLoggedProfile)
    this.router.put('/',this.globalMidleware,getUser, this.controller.updateUserProfile)
    this.router.delete('/:email',this.globalMidleware, this.controller.deleteUser)
  }
}

export default new UserRoutes().router
