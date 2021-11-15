import { getManager, Repository } from "typeorm";
import { Producto } from "../Entities/Producto";


export class ProductoRepository{
 repository():Repository<Producto>{
   return getManager().getRepository(Producto)
 }
}