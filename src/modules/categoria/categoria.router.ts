import {Router} from 'express'
import CategoriaController from './categoria.controller'
import {Middleware, RouterInterface} from '../../types'

class CategoryRoutes implements RouterInterface {
  router: Router
  controller: CategoriaController
  globalMidleware: Middleware[]

  constructor () {
    this.globalMidleware=[]
    this.router = Router()
    this.controller = new CategoriaController()
    this.config()
  }
  private config (): void {
    this.router.post('/', this.globalMidleware, this.controller.create)
    this.router.get('/', this.globalMidleware, this.controller.getAll)
  }
}



 
export default new CategoryRoutes().router