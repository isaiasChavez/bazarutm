import { Request,Response } from 'express';
import MulterService, { FOLDERS } from '../../libs/multer';
import { ServerResponse } from 'src/types';
import ErrorHelper from '../../helpers/error.helper';
import { Service } from '../interfaces/service.interface';
import { Producto } from '../product/product.entity';
import { Publication } from '../publication/publication.entity';
import { Asset } from './asset.entity';

class AssetService extends Service{
  private errorHelper: ErrorHelper
  private multerService:MulterService

  constructor () {
      super()
      this.errorHelper = new ErrorHelper(this)
      this.multerService = new MulterService()
  }



  uploadImage(folder:FOLDERS,req:Request,res:Response):Promise<ServerResponse>{
    return new Promise((resolve,reject)=>{
      this.multerService.uploadSingle(folder)(req,res,error=>{
        if (error) {
          console.log({error});
          if (error.code ==='TimeoutError') {
            resolve({
              msg:"Ha ocurrido un error al cargar tu imagen",
              status:this.HTTPResponses.InternalError
            })
          }
          resolve({
            msg:"Ha ocurrido un error al cargar tu imagen",
            status:this.HTTPResponses.InternalError
          })
          return
        }
        console.log("uploadImage: ",req.file);
        let file = req.file as any;
        let urlToReturn = file.location;
        resolve({
          msg:"ok",
          status:this.HTTPResponses.Ok,
          data:urlToReturn
        })
      })
    })
  }


  getAssetsPublication = async (publication:Publication):Promise<Asset[]> => {
    try { 

     if (!publication.producto) {
       throw new Error("Publication must have product field")
     }
     
      const assets:Asset[] = await Asset.find({
       where:{
        product:publication.producto
       },
       select:["title","description","url"]
      })

      return assets
    } catch (error) {
      this.errorHelper.genericHandler("getAssetsPublication",error)
      return []
    }
  }
 
  delete = async (asset:string|Asset):Promise<boolean> => {
    try { 

      if (typeof asset === 'string') {
        Asset.createQueryBuilder().delete().where("uuid = :asset",{
          asset
        })

      }else{
        Asset.remove(asset);
      }
      return true
    } catch (error) {
      this.errorHelper.genericHandler("getAssetsPublication",error)
      return false
    }
  }


    
}

export default AssetService