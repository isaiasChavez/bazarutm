import {ServiceReponse} from '../../types'

class ProductService {
  statusOk
  constructor () {
    this.statusOk = {
        status: 400,
        msg: 'ok'
      }
  }

  async createProduct (): Promise<ServiceReponse> {
    try {
   
      
    } catch (error) {
      console.log('Error creating product')
      return {
        status: 500,
        msg: 'Error creating product'
      }
    }
  }

  async deleteProduct (): Promise<ServiceReponse> {
    try {
   
    } catch (error) {
      console.log('Error deleting product',{error})
      return {
        status: 500,
        msg: 'Error deleting product'
      }
    }
  }

  async updateProduct (): Promise<ServiceReponse> {
    try {
   
    } catch (error) {
      console.log('Error updating product',{error})
      return {
        status: 500,
        msg: 'Error updating product'
      }
    }
  }
  async getAllProducts (req: Request, res: Response) {
   try {
   
    } catch (error) {
      console.log('Error creating product')
      return {
        status: 500,
        msg: 'Error creating product'
      }
    }
  }

  async getProduct (req: Request, res: Response) {
    try {
   
    } catch (error) {
      console.log('Error creating product')
      return {
        status: 500,
        msg: 'Error creating product'
      }
    }
  }
  async getProductsUser (req: Request, res: Response) {
    try {
   
    } catch (error) {
      console.log('Error getting Products product')
      return {
        status: 500,
        msg: 'Error creating product'
      }
    }
  }
  
}

export default ProductService