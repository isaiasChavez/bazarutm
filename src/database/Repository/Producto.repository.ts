import { getManager, Repository } from "typeorm";
import { Producto } from "../Entities/Producto.entity";


export class ProductoRepository{
 entity():Repository<Producto>{
   return getManager().getRepository(Producto)
 }
}