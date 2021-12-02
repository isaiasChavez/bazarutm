import { Request, Response } from 'express'
import { Producto } from './product.entity'
import ProductService from './product.service'
import ErrorHelper from '../../helpers/error.helper'
import { Controller } from '../interfaces/service.interface'

class ProductController extends Controller {
  private productService: ProductService
  
  constructor () {
    super()
    this.productService = new ProductService()
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
        .json({ msg: this.eH.genericHandler('getAllProducts', e) })
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
        .json({ msg: this.eH.genericHandler('getProduct', e) })
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
        .json({ msg: this.eH.genericHandler('getProductsUser', e) })
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
        .json({ msg: this.eH.genericHandler('addProduct', e) })
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
        .json({ msg: this.eH.genericHandler('deleteProduct', e) })
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
        .json({ msg: this.eH.genericHandler('updateProduct', e) })
    }
  }
}

export default ProductController
