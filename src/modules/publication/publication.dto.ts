import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'
import { CategoriesEnum } from '../../types'
import { Category } from '../categoria/categoria.entity'
import { SecureRequest } from '../interfaces/securerequest.class'
import { StatusProduct } from '../product/statusproduct/statusproduct.entity'


type  CreatePublicationDTOType ={ 
  uuid?:string,
  title:string,
   description:string,
    category:string,
     status:string,
      coverPage:string,price:number,role:string,uuidauth:string }

export class CreatePublicationDTO extends SecureRequest{

  constructor (body:CreatePublicationDTOType) {
    super({role:body.role,uuidauth:body.uuidauth})
    this.title = body.title
    this.description = body.description
    this.category = body.category
    this.statusProduct = body.status
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
  category: Category | string
  @IsNotEmpty()
  statusProduct: StatusProduct | string

  coverPage: string

  body: any
  
}



export class UpdatePublicationDTO extends CreatePublicationDTO{

  constructor (body:CreatePublicationDTOType) {
    super(body)
    this.uuid = body.uuid
  }

  @IsUUID()
  @IsNotEmpty()
  uuid: string;


}


export class GetRelated{

  constructor (category:string,publicationUuid:string) {
    this.category = category as any
    this.publicationUuid = publicationUuid
  }

  @IsEnum(CategoriesEnum)
  category: CategoriesEnum;

  @IsUUID()
  publicationUuid: string;
}
