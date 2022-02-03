import {Router} from 'express'
import {Middleware, RouterInterface} from '../../types'
import authMid from '../../middleware/auth.middleware'
import getUserMid from '../../middleware/getUser.middlesare'
import AssetController from './asset.controller'

class AssetRoutes implements RouterInterface{
  public router: Router
  controller: AssetController
  globalMidleware:Middleware[]= [authMid]

  route: string="api/asset";
  constructor () {
    this.router = Router()
    this.controller = new AssetController()
    this.config()
  }
  private config (): void {
    this.router.post('/profile',this.globalMidleware,getUserMid,this.controller.uploadProfilePicture)
  }
}



 
export default new AssetRoutes().router