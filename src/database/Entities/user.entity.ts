
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User  extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({
  type:"varchar",
  nullable:false,
  length:50
 })
 nickname:string;

 @Column({
  type:"varchar",
  nullable:false,
  length:100
 })
 email:string;
 
 @Column({
  type:"varchar",
  nullable:false,
  length:100
 })
 avatar:string;
 
 @CreateDateColumn()
 CREATED_AT: string;
}