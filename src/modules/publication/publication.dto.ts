import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from '../categoria/categoria.entity'
import { SecureRequest } from '../interfaces/securerequest.class'
import { StatusProduct } from '../product/statusproduct/statusproduct.entity'


export class UpdatePublicationDTO extends SecureRequest{
  constructor (body:{ title, description, category, statusProduct, coverPage,price,role,uuidauth }) {
    super({role:body.role,uuidauth:body.uuidauth})
    this.title = body.title
    this.description = body.description
    this.category = body.category
    this.statusProduct = body.statusProduct
    this.coverPage = body.coverPage
    this.price = body.price
    this.body = body
  }

  role: string;
  uuidauth: string;

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
  category: Category
  @IsNotEmpty()
  statusProduct: StatusProduct

  coverPage: string

  body: any
}


export class CreatePublicationDTO extends UpdatePublicationDTO{

  constructor (body:{ title:string, description:string, category:string, statusProduct:string, coverPage:string,price:number,role:string,uuidauth:string }) {
    super(body)
  }
}



