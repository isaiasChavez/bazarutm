import {Router} from 'express'
import PublicationController from './publication.controller'
import {RouterInterface} from '../../types'

class PublicationRoutes implements RouterInterface{
  public router: Router
  controller: PublicationController
  globalMidleware: any;
  route: string="api/publication";
  constructor () {
    this.globalMidleware =[]
    this.router = Router()
    this.controller = new PublicationController()
    this.config()
  }
  private config (): void {
    this.router.post('/',this.globalMidleware,this.controller.create)
  }
}



 
export default new PublicationRoutes().router