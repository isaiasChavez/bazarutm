import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Producto } from '../product/product.entity'
import { Sale } from '../sale/sale.entity'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  name: string
  
  @OneToMany(() => Producto, product => product.category)
  product: Producto[];

  
}
