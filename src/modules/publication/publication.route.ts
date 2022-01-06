import {Router} from 'express'
import PublicationController from './publication.controller'
import {Middleware, RouterInterface} from '../../types'
import authMid from '../../middleware/auth.middleware'
import getUserMid from '../../middleware/getUser.middlesare'

class PublicationRoutes implements RouterInterface{
  public router: Router
  controller: PublicationController
  globalMidleware:Middleware[]= [authMid]

  route: string="api/publication";
  constructor () {
    this.router = Router()
    this.controller = new PublicationController()
    this.config()
  }
  private config (): void {
    this.router.post('/',this.globalMidleware,getUserMid,this.controller.create)
    this.router.get('/all',this.controller.getAll)

    this.router.delete('/:uuid',this.globalMidleware,getUserMid,this.controller.deletePublication)
    this.router.put('/',this.globalMidleware,getUserMid,this.controller.update)
    this.router.get('/user',this.globalMidleware,getUserMid,this.controller.getAllOfUser)
    this.router.get('/:uuid',this.controller.getOne)
    
  }
}



 
export default new PublicationRoutes().router