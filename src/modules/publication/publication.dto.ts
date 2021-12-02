import { Category } from '../categoria/categoria.entity'
import { StatusProduct } from '../product/statusproduct/statusproduct.entity'


export class UpdatePublicationDTO {
  constructor ({ title, description, category, statusProduct, coverPage }) {
    this.title = title
    this.description = description
    this.category = category
    this.statusProduct = statusProduct
    this.coverPage = coverPage
  }

  title: string
  description: string
  category: Category
  statusProduct: StatusProduct
  coverPage: string
}


export class CreatePublicationDTO extends UpdatePublicationDTO{
  constructor ({ title, description, category, statusProduct, coverPage }) {
    super({title, description, category, statusProduct, coverPage})
  }
  
}



