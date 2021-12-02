import { Request, Response } from 'express'
import { ServerResponse } from '../../../types'
import { Controller } from '../../interfaces/service.interface'
import StatusProductService from './statusproduct.service'

class StatusProductController extends Controller {
  private statusProductService: StatusProductService

  private firsValueRes = {
    status: this.HTTPResponses.BadRequest,
    data: null,
    msg: 'ok'
  }

  constructor () {
    super()
    this.statusProductService = new StatusProductService()
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes
      response = await this.statusProductService.getAll()
      res.status(response.status).json(response)
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getAll', e) })
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(this.HTTPResponses.Unauthorized)
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('create', e) })
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {

      res.status(this.HTTPResponses.Unauthorized)
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.eH.genericHandler('delete', e) })
    }
  }
  
}

export default StatusProductController
