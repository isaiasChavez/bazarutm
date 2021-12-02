import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from '../role/role.entity'
import { CreateUserDTO } from './user.dto'
import { typesUser } from '../../types'
import { Profile } from '../profile/profile.entity'

@Entity()
export class User extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number

 @Column()
 @Generated("uuid")
    uuid: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  email: string

  @Column({
    type: 'enum',
    enum: typesUser,
    default: typesUser.user,
    nullable: false
  })
  type: typesUser

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  password: string

  @ManyToOne(
    () => Role,
    role => role.user
  )
  role: Role


   @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

}
