import { Category } from './../categoria/categoria.entity';
import { Request, Response } from 'express'
import { ServerResponse } from '../../types'
import { validateOrReject } from 'class-validator'
import { Controller } from '../interfaces/service.interface'
import AssetService from './asset.service';
import { FOLDERS } from '../../libs/multer';
import UserService from '../user/user.service';
import { User } from '../user/user.entity';




class AssetController extends Controller {
  private assetService: AssetService
  private userService: UserService
  private firsValueRes = { status: 400, data: null, msg: 'ok' }

  
  constructor () {
    super()
    this.assetService = new AssetService()
    this.userService = new UserService()
  }

  public uploadProfilePicture = async (req: Request, res: Response): Promise<void> => {
    try { 
      console.log(req.body);
      const user:User = {...req.body.user}
      const folder = FOLDERS.profile
      console.log({folder,user});
      this.assetService.uploadImage(folder,req,res).then(async(response:ServerResponse)=>{ 

        if (response.status === this.HTTPResponses.Ok) {
          const finalRes:ServerResponse =await this.userService.updateUserAvatar(response.data,user)
          res.status(finalRes.status).json(finalRes)
        }else{ 
          res.status(response.status).json(response)
        }
      }) 
          
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('addProduct', e) })
    }
  }



}

export default AssetController
