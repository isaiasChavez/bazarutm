import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Asset } from '../asset/asset.entity'
import { Category } from '../categoria/categoria.entity'
import { Publication } from '../publication/publication.entity'
import { StatusProduct } from './statusproduct/statusproduct.entity'

@Entity()
export class Producto extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => StatusProduct,
    statusProduct => statusProduct.product
  )
  statusProduct: StatusProduct

  @OneToMany(
    () => Asset,
    asset => asset.product
  )
  assets: Asset[]
  
  @OneToOne(()=> Publication,publication=> publication.producto)
  publication:Publication
}
