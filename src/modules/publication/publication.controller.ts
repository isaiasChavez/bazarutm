import { Request, Response } from 'express'
import PublicationService from './publication.service'
import { ServerResponse } from '../../types'
import { CreatePublicationDTO } from './publication.dto'
import { validateOrReject } from 'class-validator'
import { Controller } from '../interfaces/service.interface'

class PublicationController extends Controller {
  private publicationService: PublicationService
  private firsValueRes = { status: 400, data: null, msg: 'ok' }
  constructor () {
    super()
    this.publicationService = new PublicationService()
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes

      
      
      res.status(response.status).json(response)
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('addProduct', e) })
    }
  }

  public getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getOne', e) })
    }
  }
  public getAllOfUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getAllOfUser', e) })
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes
      const data = new CreatePublicationDTO(req.body)
      await validateOrReject(data)
        .then(async () => {
          response = await this.publicationService.create(data)
        })
        .catch(e => {
          response.msg = this.eH.validationHandler('create', e)
        })
      res.status(response.status).json(response)
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('addProduct', e) })
    }
  }

  public deletePublication = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.eH.genericHandler('deletePublication', e) })
    }
  }
  public updatePublication = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      res.json({
        msg: 'Si',
        token: '1'
      })
    } catch (e) {
      res
        .status(500)
        .json({ msg: this.eH.genericHandler('updatePublication', e) })
    }
  }
}

export default PublicationController
