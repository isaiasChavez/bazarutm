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

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  nickname: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  email: string

  @CreateDateColumn()
  CREATED_AT: string

  @OneToMany(
    () => Sale,
    sale => sale.user
  )
  sales: Sale[]

  @ManyToOne(() => Role, role => role.user)
  role: User;
}
