
import {BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class ConfigurationUser  extends BaseEntity{
 @PrimaryGeneratedColumn()
 id?:number;
 

 @Column({
  type: 'boolean',
  default:false,
  nullable:false,
 })
 instagram:boolean;

 @Column({
    type: 'boolean',
    default:false,
    nullable:false,
   })
 telegram:boolean;

@OneToMany(() => User, user => user.configurationUser)
user: User[];

}