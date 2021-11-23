import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Producto } from '../product/product.entity'
import { Sale } from '../sale/sale.entity'

@Entity()
export class DetailSale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  name: string

  @ManyToOne(
    () => Producto,
    product => product.detailssales
  )
  product: Producto
  @ManyToOne(
    () => Sale,
    sale => sale.detailsales
  )
  sale: Sale
}
