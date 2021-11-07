import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
 

}