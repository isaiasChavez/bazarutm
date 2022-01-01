import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Producto } from '../product/product.entity'
import {CategoriesEnum} from '../../types'
import { Publication } from '../publication/publication.entity'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: CategoriesEnum,
    default: CategoriesEnum.OTROS,
    nullable: false
  })
  name: string

  
  @OneToMany(() => Publication, publication => publication.category)
  publication: Publication[];

  
}
