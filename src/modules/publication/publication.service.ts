import { CreatePublicationDTO } from './publication.dto'
import { ServiceReponse, ServerResponse } from '../../types'
import { Publication } from './publication.entity'
import AssetService from '../asset/asset.service'
import { Asset } from '../asset/asset.entity'
import { Service } from '../interfaces/service.interface'
import { Producto } from '../product/product.entity'

class PublicationService extends Service{
  private statusOk
  private assetService: AssetService = new AssetService()
  constructor () {
    super()
    this.statusOk = {
      status: this.HTTPResponses.Ok,
      msg: 'ok'
    }
  }

  async create (createDTO: CreatePublicationDTO): Promise<ServiceReponse> {
    try {

      const publication = Publication.create(createDTO)

      Publication.save(publication)
      return {
        msg:'ok',
        status:this.HTTPResponses.OkCreated
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("create",error)
      }
    }
  }

  async getOne (uuid: string): Promise<ServerResponse> {
    try {
      const publication: Publication = await Publication.findOne({
        where: {
          uuid
        },
        relations: ['category', 'producto'],
        select: ['title', 'coverPage', 'description', 'isActive']
      })

      if (!publication) {
        return {
          msg: 'There is not publication',
          status: this.HTTPResponses.OkNoContent,
         }
      }

      const assets: Asset[] = await this.assetService.getAssetsPublication(
        publication
      )

      return {
        msg: 'Ok',
        status: this.HTTPResponses.Ok,
        data: {
          publication,
          assets
        }
      }

    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("getOne",error)
      }
    }
  }

  async getAll (): Promise<ServiceReponse> {
    try {
      const publications: Publication[] = await Publication.find({
        where: {
          isActive: true
        },
        relations: ['category'],
        select: ['title', 'coverPage', 'description', 'isActive']
      })

      if (publications.length === 0) {
        return {
          msg: 'There is not values',
          status: this.HTTPResponses.OkNoContent
        }
      }

      return this.statusOk
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("getAll",error)
      }
    }
  }
}

export default PublicationService
