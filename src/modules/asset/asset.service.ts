import ErrorHelper from '../../helpers/error.helper';
import { Producto } from '../product/product.entity';
import { Publication } from '../publication/publication.entity';
import { Asset } from './asset.entity';

class AssetService {
  private errorHelper: ErrorHelper
  constructor () {
      this.errorHelper = new ErrorHelper(this)
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