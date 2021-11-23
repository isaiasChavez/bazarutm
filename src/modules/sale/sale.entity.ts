import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { DetailSale } from '../detailsale/detailsale.entity'
import { User } from '../user/user.entity'

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50
  })
  name: string

  @ManyToOne(
    () => User,
    user => user.sales
  )
  user: User

   @OneToMany(() => DetailSale, detailSale => detailSale.sale)
    detailsales: DetailSale[];

}
