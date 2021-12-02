
import {BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../user/user.entity';
import {Roles} from '../../types'

@Entity()
export class Role  extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number;
 @Column()
 @Generated("uuid")
 uuid: string;

 @Column({
  type: "enum",
  enum: Roles,
  default:Roles.user,
  nullable:false,
 })
 name:string;

@OneToMany(() => User, user => user.role)
user: User[];

}