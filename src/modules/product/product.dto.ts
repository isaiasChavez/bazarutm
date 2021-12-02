import { IsEnum } from 'class-validator';
import {CategoriesEnum,StatusProductEnum} from '../../types';
import { Publication } from '../publication/publication.entity';

export interface CreateProductDTO {}

export class UpdateProductDTO {

  constructor({category,status}:{category:CategoriesEnum,status:StatusProductEnum}){
    this.category = category;
    this.status = status;
  }

  @IsEnum(CategoriesEnum)
  category:CategoriesEnum

  @IsEnum(StatusProductEnum)
  status:StatusProductEnum

}


export class CreateProductDTO extends UpdateProductDTO {

  constructor({category,status,publication}:{category:CategoriesEnum,status:StatusProductEnum,publication:Publication}) {
   super({category,status})
   this.publication = publication
  }

  publication:Publication
}


