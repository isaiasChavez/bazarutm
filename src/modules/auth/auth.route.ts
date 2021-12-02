import { Router } from 'express'
import AuthController from './auth.controller'
import {Middleware, RouterInterface} from '../../types'
class AuthRoutes implements RouterInterface{
  
  router: Router
  controller: AuthController
  globalMidleware: Middleware[] = [];
  
  constructor () {
    this.router = Router()
    this.controller = new AuthController()
    this.config()
  }
  private config (): void {
    
   this.router.post("/",this.globalMidleware,this.controller.logIn)
   this.router.post("/logout",this.globalMidleware,this.controller.logOut)

  }
}
export default new AuthRoutes().router
