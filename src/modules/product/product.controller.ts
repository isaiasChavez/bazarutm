import { Request, Response } from 'express'
import { Producto } from './product.entity'
import ProductService from './product.service'
import ErrorHelper from '../../helpers/error.helper'

class ProductController {
  private productService: ProductService
  private errorHelper: ErrorHelper
  constructor () {
    this.productService = new ProductService()
    this.errorHelper = new ErrorHelper(this)
  }

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('getAllProducts', e) })
    }
  }

  getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('getProduct', e) })
    }
  }
  getProductsUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('getProductsUser', e) })
    }
  }

  addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('addProduct', e) })
    }
  }

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('deleteProduct', e) })
    }
  }
  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.errorHelper.genericHandler('updateProduct', e) })
    }
  }
}

export default ProductController
