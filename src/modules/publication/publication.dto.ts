import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from '../categoria/categoria.entity'
import { StatusProduct } from '../product/statusproduct/statusproduct.entity'


export class UpdatePublicationDTO {
  constructor ({ title, description, category, statusProduct, coverPage,price }) {
    this.title = title
    this.description = description
    this.category = category
    this.statusProduct = statusProduct
    this.coverPage = coverPage
    this.price = price
  }

  @IsNotEmpty()
  @IsString()
  title: string
  @IsNotEmpty()
  @IsNumber()
  price: number
  @IsNotEmpty()
  @IsString()
  description: string
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category
  @IsNotEmpty()
  @IsEnum(StatusProduct)
  statusProduct: StatusProduct

  coverPage: string
}


export class CreatePublicationDTO extends UpdatePublicationDTO{
  constructor ({ title, description, category, statusProduct, coverPage,price }) {
    super({title, description, category, statusProduct, coverPage,price})
  }
  
}



