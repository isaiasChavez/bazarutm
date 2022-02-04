import {Router} from 'express'
import {Middleware, RouterInterface} from '../../types'
import authMid from '../../middleware/auth.middleware'
import getUserMid from '../../middleware/getUser.middlesare'
import ConfigurationUserController from './configurationUser.controller'

class ConfigurationUserRoutes implements RouterInterface{
  public router: Router
  controller: ConfigurationUserController
  globalMidleware:Middleware[]= [authMid]

  route: string="api/config";
  constructor () {
    this.router = Router()
    this.controller = new ConfigurationUserController()
    this.config()
  }
  private config (): void {
    this.router.put('/',this.globalMidleware,getUserMid,this.controller.update)
    this.router.get('/',this.globalMidleware,getUserMid,this.controller.get)
  }
}



 
export default new ConfigurationUserRoutes().router