import { ServiceReponse, ServerResponse } from '../../types'
import { Service } from '../interfaces/service.interface'
import { Category } from './categoria.entity'

class CategoriaService extends Service {
  private statusOk
  constructor () {
    super()
    this.statusOk = {
      status: this.HTTPResponses.Ok,
      msg: 'ok'
    }
  }

  async create (): Promise<ServiceReponse> {
    try {
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('create', error)
      }
    }
  }
  async getAll (): Promise<ServerResponse> {
    try {
      const categories: Category[] = await Category.find({
        select: ['name', 'id']
      })
      console.log({categories})
      if (categories.length === 0) {
        return {
          msg: 'There are not categories',
          status: this.HTTPResponses.InternalError,
        }
      }
      return {
        msg: 'ok',
        status: this.HTTPResponses.Ok,
       data:{
        categories
       }
      }
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('getAll', error)
      }
    }
  }
}

export default CategoriaService
