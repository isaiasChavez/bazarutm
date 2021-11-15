import {Router} from 'express'
import ProductController from '../controller/product.controller'

class ProductRoutes {
  public router: Router
  protected controller: ProductController

  constructor () {
    this.router = Router()
    this.controller = new ProductController()
    this.config()
  }
  private config (): void {
    this.router.post('/',  this.controller.addProduct)
  }
}



 
export default new ProductRoutes().router