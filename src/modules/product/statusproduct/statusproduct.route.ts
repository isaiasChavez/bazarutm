import {Router} from 'express'
import StatusProductController from './statusproduct.controller'
import {Middleware, RouterInterface} from '../../../types'
import authMid from '../../../middleware/auth.middleware'
class ProductRoutes implements RouterInterface{
  public router: Router
  controller: StatusProductController
  globalMidleware:Middleware[]= [authMid]

  route: string="api/statusproduct"

  constructor () {
    this.router = Router()
    this.controller = new StatusProductController()
    this.config()
  }
  private config (): void {
    this.router.get('/', this.globalMidleware, this.controller.getAll)
  }
}



 
export default new ProductRoutes().router