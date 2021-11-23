
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../user/user.entity';
import {typesUser} from '../../types'

@Entity()
export class Role  extends BaseEntity{
 @PrimaryGeneratedColumn()
 id:number;

 @Column({
  type: "enum",
  enum: typesUser,
  default:typesUser.user,
  nullable:false,
 })
 name:string;

  @OneToMany(() => User, user => user.role)
  user: User[];

}