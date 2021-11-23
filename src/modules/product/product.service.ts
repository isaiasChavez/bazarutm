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
  
}

export default ProductService