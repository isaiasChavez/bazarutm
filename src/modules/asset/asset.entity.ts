import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Producto } from '../product/product.entity'

@Entity()
export class Asset extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
    uuid: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  url: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150
  })
  description: string

  @ManyToOne(() => Producto, product => product.assets)
  product: Producto;
}
