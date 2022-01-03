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
import { Category } from '../categoria/categoria.entity'
import { Producto } from '../product/product.entity'
import { User } from '../user/user.entity'

@Entity()
export class Publication extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  @Generated('uuid')
  uuid: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  title: string

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150
  })
  description: string

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  isActive: boolean

  @ManyToOne(
    () => Category,
    category => category.publication
  )
  category: Category

  @ManyToOne(
    () => User,
    user => user.publication,
  )
  user: User

  @Column({
    type: 'varchar',
    nullable: false
  })
  coverPage: string

   @OneToOne(() => Producto)
    @JoinColumn()
    producto: Producto;

  

}
