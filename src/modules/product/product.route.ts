import {Router} from 'express'
import ProductController from './product.controller'
import {Middleware, RouterInterface} from '../../types'
import authMid from '../../middleware/auth.middleware'

class ProductRoutes implements RouterInterface{
  public router: Router
  controller: ProductController
  globalMidleware:Middleware[]= [authMid]
  route:string ='/api/product'
  constructor () {
    this.globalMidleware=[]
    this.router = Router()
    this.controller = new ProductController()
    this.config()
  }
  private config (): void {
    this.router.post('/',this.globalMidleware, this.controller.addProduct)
  }
}



 
export default new ProductRoutes().router