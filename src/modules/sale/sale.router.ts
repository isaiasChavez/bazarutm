import { Router } from 'express'
import authMid from '../../middleware/auth'
import SaleController from './sale.controller'

class UserRoutes {
  public router: Router
  private controller: SaleController

  constructor () {
    this.router = Router()
    this.controller = new SaleController()
    this.config()
  }
  private config (): void {
    this.router.post('/', authMid, this.controller.createSale)
  }
}

export default new UserRoutes().router
