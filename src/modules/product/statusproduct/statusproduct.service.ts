import { ServiceReponse, ServerResponse } from '../../../types'
import { Service } from '../../interfaces/service.interface'
import { StatusProduct } from './statusproduct.entity'

class StatusProductService extends Service {
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
      const statuses: StatusProduct[] = await StatusProduct.find({
        select: ['name', 'id']
      })
      if (statuses.length === 0) {
        return {
          msg: 'There are not statuses',
          status: this.HTTPResponses.InternalError,
        }
      }
      return {
        msg: 'ok',
        status: this.HTTPResponses.Ok,
       data:{
        statuses
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

export default StatusProductService
