import {Request,Response} from 'express';
import { Producto } from './product.entity'
import ProductService from './product.service';

class ProductController {
  
private productService:ProductService;
  
 constructor(){
  this.productService = new ProductService()  
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
