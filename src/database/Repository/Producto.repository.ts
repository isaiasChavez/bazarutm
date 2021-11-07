import { getManager, Repository } from "typeorm";
import { Producto } from "../Entities/Producto";


export class ProductoRepository{
 entity():Repository<Producto>{
   return getManager().getRepository(Producto)
 }
}