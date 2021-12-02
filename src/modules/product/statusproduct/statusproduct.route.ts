import {Router} from 'express'
import StatusProductController from './statusproduct.controller'
import {Middleware, RouterInterface} from '../../../types'
class ProductRoutes implements RouterInterface{
  public router: Router
  controller: StatusProductController
  globalMidleware: Middleware[] = []

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