import {Request,Response} from 'express';
import { Repository } from 'typeorm'
import { Producto } from '../database/Entities/Producto'
import { ProductoRepository } from '../database/Repository/Producto.repository'

class ProductController {

 private productRepository: Repository<Producto>
 
 constructor(){
  this.productRepository = new ProductoRepository().repository() 
 }

 addProduct= async (req:Request,res:Response)=> {
   
    try {
      
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
    
  }
}

export default ProductController
