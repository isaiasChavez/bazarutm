import {ServiceReponse} from '../../types'
import ErrorHelper from '../../helpers/error.helper';
import {CreateProductDTO,UpdateProductDTO} from './product.dto';
class ProductService {
  statusOk
  private errorHelper: ErrorHelper

  constructor () {
    this.statusOk = {
        status: 400,
        msg: 'ok'
      }
      this.errorHelper = new ErrorHelper(this)

      
  }

  createProduct = async (createProductDTO:CreateProductDTO):Promise<ServiceReponse> => {
    try {

      
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("createProduct",error)
      }
    }
  }

  deleteProduct  = async (productUuid:string): Promise<ServiceReponse>=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("deleteProduct",error)
      }
    }
  }

  updateProduct  = async(updateProductDTO:UpdateProductDTO): Promise<ServiceReponse>=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("updateProduct",error)
      }
    }
  }
  getAllProducts =  async()=>  {
   try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("getAllProducts",error)
      }
    }
  }

  getProduct = async ()=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("getProduct",error)
      }
    }
  }
  getProductsUser  = async()=> {
    try {
      
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("getProductsUser",error)
      }
    }
  }
  
}

export default ProductService