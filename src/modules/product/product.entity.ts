import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Category } from '../categoria/categoria.entity';
import { DetailSale } from '../detailsale/detailsale.entity';

@Entity()
export class Producto{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({
  type:"varchar",
  nullable:false,
  length:50
 })
 nombre:string;

 @Column({
  type:"varchar",
  nullable:false,
  length:150
 })

 image:string;

  @OneToMany(() => DetailSale, detailsale => detailsale.product)
    detailssales: DetailSale[];


  @ManyToOne(
    () => Category,
    category => category.product
  )
  category: Category 

 
 

}