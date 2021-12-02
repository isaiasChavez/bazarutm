import {ServiceReponse} from '../../types'
import ErrorHelper from '../../helpers/error.helper';
import {CreateProductDTO,UpdateProductDTO} from './product.dto';
import { Service } from '../interfaces/service.interface';
class ProductService extends Service {
  statusOk
  constructor () {
    super()
    this.statusOk = {
        status: this.HTTPResponses.Ok,
        msg: 'ok'
      }      
  }

  createProduct = async (createProductDTO:CreateProductDTO):Promise<ServiceReponse> => {
    try {

      
    } catch (error) {
     return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("createProduct",error)
      }
    }
  }

  updateProduct  = async(updateProductDTO:UpdateProductDTO): Promise<ServiceReponse>=> {
    try {


   
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateProduct",error)
      }
    }
  }

  deleteAssetProduct  = async(uuidAsset:string): Promise<ServiceReponse>=> {
    try {

      

   
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("updateProduct",error)
      }
    }
  }
  

  
  
  
}

export default ProductService