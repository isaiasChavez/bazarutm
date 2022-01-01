import { Router } from 'express'
import AuthController from './auth.controller'
import {Middleware, RouterInterface} from '../../types'
class AuthRoutes implements RouterInterface{
  
  router: Router
  controller: AuthController
  globalMidleware: Middleware[] = [];
  route:'/api/auth'
  
  constructor () {
    this.router = Router()
    this.controller = new AuthController()
    this.config()
  }
  private config (): void {
    
   this.router.post("/",this.globalMidleware,this.controller.logIn)
   this.router.post("/logout",this.globalMidleware,this.controller.logOut)
   this.router.post("/validate/:token",this.globalMidleware,this.controller.validateTokenSesion)
   

  }
}
export default new AuthRoutes().router
