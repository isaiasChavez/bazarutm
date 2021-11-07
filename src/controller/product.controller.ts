import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { Producto } from '../database/Entities/Producto.entity'
import { ProductoRepository } from '../database/Repository/Producto.repository'

class ProductController {

 private productRepository: Repository<Producto>
 constructor(){
  this.productRepository = new ProductoRepository().entity() 
 }

 addProduct= async (req, res)=> {
   
    try {
      
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {}
    
  }
}

export default ProductController
