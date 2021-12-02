import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Producto } from '../product.entity'
import { StatusProductEnum } from '../../../types'
@Entity()
export class StatusProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: StatusProductEnum,
    default: StatusProductEnum.NUEVO,
    nullable: false
  })
  name: string

  @OneToMany(
    () => Producto,
    product => product.statusProduct
  )
  product: Producto[]
}
