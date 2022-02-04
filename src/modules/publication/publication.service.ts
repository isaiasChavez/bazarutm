import { Category } from './../categoria/categoria.entity'
import { CreatePublicationDTO, GetRelated, UpdatePublicationDTO } from './publication.dto'
import { ServiceReponse, ServerResponse, StatusProductEnum, CategoriesEnum } from '../../types'
import { Publication } from './publication.entity'
import AssetService from '../asset/asset.service'
import { Asset } from '../asset/asset.entity'
import { Service } from '../interfaces/service.interface'
import { Producto } from '../product/product.entity'
import { StatusProduct } from '../product/statusproduct/statusproduct.entity'
import UserService from '../user/user.service'
import { User } from '../user/user.entity'
import { Request } from 'express'
import { Like, Not } from 'typeorm'

class PublicationService extends Service {
  private statusOk
  private assetService: AssetService = new AssetService()
  private userService: UserService = new UserService()

  constructor() {
    super()
    this.statusOk = {
      status: this.HTTPResponses.Ok,
      msg: 'ok',
    }
  }

  async create(dto: CreatePublicationDTO): Promise<ServiceReponse> {
    try {
      const user: User = dto.body.user


      const statusProduct: StatusProduct = await StatusProduct.findOne({
        where: {
          name: dto.statusProduct,
        },
      })

      const category: Category = await Category.findOne({
        where: {
          name: dto.category,
        },
      })

      const producto: Producto = Producto.create({
        statusProduct,
      })
      await Producto.save(producto)

      const imagenesParsed =  JSON.parse(dto.images)

      const publication = Publication.create({
        category,
        coverPage: imagenesParsed[0],
        description: dto.description,
        title: dto.title,
        price: dto.price,
        producto,
        images:dto.images,
        user,
      })

      await Publication.save(publication)

      return {
        msg: 'ok',
        status: this.HTTPResponses.OkCreated,
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('create', error),
      }
    }
  }

  async update(dto: UpdatePublicationDTO): Promise<ServiceReponse> {
    try {

      const user: User = dto.body.user
      const publication: Publication = await Publication.createQueryBuilder(
        'publication',
      )
        .leftJoinAndSelect('publication.producto', 'producto')
        .leftJoinAndSelect('publication.user', 'user')
        .leftJoinAndSelect('publication.category', 'category')
        .leftJoinAndSelect('producto.statusProduct', 'statusProduct')
        .where('publication.uuid = :uuid', { uuid: dto.uuid })
        .getOne()
      if (publication.user.uuid !== user.uuid) {
        return {
          msg: 'unauthorized',
          status: this.HTTPResponses.Unauthorized,
        }
      }

      const product: Producto = publication.producto
      publication.title =
        publication.title !== dto.title ? dto.title : publication.title
      publication.description =
        publication.description !== dto.description
          ? dto.description
          : publication.description
      const categoryHasChanged = publication.category.name !== dto.category
      const statusHasChanged = product.statusProduct.name !== dto.statusProduct

      if (categoryHasChanged) {
        const category: Category = await Category.findOne({
          where: {
            name: dto.category,
          },
        })

        publication.category = category
      }

      if (statusHasChanged) {
        const statusProduct: StatusProduct = await StatusProduct.findOne({
          where: {
            name: dto.statusProduct,
          },
        })
        product.statusProduct = statusProduct
        await Producto.save(product)
      }

      await Publication.save(publication)

      return {
        msg: 'ok',
        status: this.HTTPResponses.OkCreated,
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('create', error),
      }
    }
  }

  async getOne(uuid: string): Promise<ServerResponse> {
    try {

      const publication = await Publication.createQueryBuilder('publication')
        .leftJoinAndSelect('publication.producto', 'producto')
        .leftJoinAndSelect('publication.category', 'category')
        .leftJoinAndSelect('publication.user', 'user')
        .leftJoinAndSelect('producto.statusProduct', 'statusProduct')
        .where('publication.uuid = :uuid', {
          uuid,
        })
        .getOne()
        
        if (!publication) {
          return {
            msg: 'There is not publication',
            status: this.HTTPResponses.OkNoContent,
          }
        }
        const userData = await  this.userService.getUserProfile({
          email:publication.user.email,
        })
        console.log({userData});
        const response = { ...publication } as any
        
        response.status = publication.producto.statusProduct.name
        response.category = publication.category.name
        response.user = {...response.user,...userData.data.profile}
        
        
        delete response.user.id
        delete response.producto
        delete response.id
        
        if (!userData.data.configuration.instagram) {
          response.user.instagram = null
        }
        if (!userData.data.configuration.telegram) {
          response.user.telegram = null
        }
        console.log({response});

      return {
        msg: 'Ok',
        status: this.HTTPResponses.Ok,
        data: response,
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getOne', error),
      }
    }
  }

  async delete(uuid: string,req:Request): Promise<ServerResponse> {
    try {
      const user = req.body.user
      const publication = await Publication.findOne({
        where:{
          uuid
        },
        relations:["producto","user"]
      })

      
        if (!publication) {
          return {
            msg: 'There is not publication',
            status: this.HTTPResponses.OkNoContent,
          }
        }
      if (publication.user.uuid !== user.uuid) {
        return {
          msg: 'unauthorized',
          status: this.HTTPResponses.Unauthorized,
        }
      }
      await Promise.all([Publication.delete(publication),Producto.delete(publication.producto)]) 
      

      return {
        msg: 'Ok',
        status: this.HTTPResponses.Ok,
        data: null,
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getOne', error),
      }
    }
  }

  async getAll(category:string,query:string): Promise<ServerResponse> {
    try {

      let publications : Publication[]

      const realQuery = query.toLowerCase().trim()

      if (category==="ALL") {
        publications = await Publication.find({
          where: {
            isActive: true,
            title: Like(`%${realQuery}%`),
          },
          relations: ['category'],
          select: ['title',  'description', 'isActive',"uuid","coverPage","images"],
        })
        
      }else{
        publications = await Publication.find({
          where: {
            isActive: true,
            category:{
              name:category
            }
          },
          relations: ['category'],
          select: ['title',  'description', 'isActive',"uuid","coverPage","images"],
        })
      }
      if (publications.length === 0) {
        return {
          msg: 'There is not values',
          status: this.HTTPResponses.OkNoContent,
        }
      }

      return {
        msg:"ok",
        status: this.HTTPResponses.Ok,
        data:publications
        
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getAll', error),
      }
    }
  }


  async getRelated(dto:GetRelated): Promise<ServerResponse> {
    try {


      
      const categorySearch:Category = await Category.findOne({
        where:{
          name:dto.category
        }
      })



      const publications: Publication[] = await Publication.find({
        where: {
          isActive: true,
          category:categorySearch,
          uuid:Not(dto.publicationUuid)
        },
        take:3
      })
      

      if (publications.length === 0) {
        console.log("No hay contenido")
        return {
          msg: 'There is not values',
          status: this.HTTPResponses.OkNoContent,
        }
      }

      return {
        msg:"ok",
        status: this.HTTPResponses.Ok,
        data:publications
        
      }
    } catch (error) {
      console.log({error})
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getAll', error),
      }
    }
  }


  async getAllOfUser(req: Request): Promise<ServerResponse> {
    try {
      const user = req.body.user

      const publications: Publication[] = await Publication.find({
        where: {
          user,
        },
        relations: ['category'],
        select: [
          'title',
          'coverPage',
          'description',
          'isActive',
          "coverPage",
          "images",
          'price',
          'uuid',
        ],
      })

      if (publications.length === 0) {
        return {
          msg: 'There is not values',
          status: this.HTTPResponses.OkNoContent,
        }
      }
      this

      return {
        ...this.statusOk,
        data: publications,
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getAll', error),
      }
    }
  }
}

export default PublicationService
