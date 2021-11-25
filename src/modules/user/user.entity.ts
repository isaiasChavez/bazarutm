import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from '../role/role.entity'
import { Sale } from '../sale/sale.entity'
import { CreateUserDTO } from './user.dto'
import { typesUser } from '../../types'

@Entity()
export class User extends BaseEntity implements CreateUserDTO {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  lastname: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  email: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  gender: boolean

  @Column({
    type: 'enum',
    enum: typesUser,
    default: typesUser.user,
    nullable: false
  })
  type: typesUser

  @Column({
    type: 'timestamp',
    nullable: false
  })
  birthday: Date

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  password: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: string

  @CreateDateColumn()
  CREATED_AT: string

  @OneToMany(
    () => Sale,
    sale => sale.user
  )
  sales: Sale[]

  @ManyToOne(
    () => Role,
    role => role.user
  )
  role: Role
}
