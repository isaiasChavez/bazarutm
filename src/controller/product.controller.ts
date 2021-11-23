import {Request,Response} from 'express';
import { Producto } from '../database/Entities/product.entity'

class ProductController {
 
 constructor(){
 }

 async addProduct(req:Request,res:Response){
   
    try {
      
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
    
  }
}

export default ProductController
