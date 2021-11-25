import { Request, Response } from 'express'
import { Producto } from './product.entity'
import ProductService from './product.service'
import ErrorHelper from '../../helpers/error.helper';

class ProductController {
  private productService: ProductService  
  private errorHelper: ErrorHelper
  constructor () {
    console.log(this)
    this.productService = new ProductService()
    this.errorHelper = new ErrorHelper(this)
    this.addProduct = this.addProduct.bind(this)
  }

  async getAllProducts (req: Request, res: Response) {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
  }

  async getProduct (req: Request, res: Response) {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
  }
  async getProductsUser (req: Request, res: Response) {
    try {
      
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
    }
  }

  addProduct = (req: Request, res: Response)=> {

    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
      
    } catch (e) {
        res.status(500).json({msg:this.errorHelper.genericHandler("addProduct",e)})
    }
  }

  async deleteProduct (req: Request, res: Response) {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
  }
  async updateProduct (req: Request, res: Response) {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
  }
}

export default ProductController
