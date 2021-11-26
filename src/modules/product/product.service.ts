import {ServiceReponse} from '../../types'
import ErrorHelper from '../../helpers/error.helper';

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

  createProduct = async ():Promise<ServiceReponse> => {
    try {
   
      
    } catch (error) {
      
    
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("createProduct",error)
      }
    }
  }

  deleteProduct  = async (): Promise<ServiceReponse>=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("deleteProduct",error)
      }
    }
  }

   updateProduct  = async(): Promise<ServiceReponse>=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("updateProduct",error)
      }
    }
  }
  getAllProducts =  async(req: Request, res: Response)=>  {
   try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("getAllProducts",error)
      }
    }
  }

  getProduct=   async (req: Request, res: Response)=> {
    try {
   
    } catch (error) {
      return {
        status: 500,
        msg: this.errorHelper.genericHandler("getProduct",error)
      }
    }
  }
  getProductsUser  = async(req: Request, res: Response)=> {
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