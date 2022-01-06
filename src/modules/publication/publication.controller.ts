import { Request, Response } from 'express'
import PublicationService from './publication.service'
import { ServerResponse } from '../../types'
import { CreatePublicationDTO, GetRelated, UpdatePublicationDTO } from './publication.dto'
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
      
      response = await this.publicationService.getAll()
      console.log("Solicitando todos los recursos",{response})

      res.status(200).json(response)

      
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('addProduct', e) })
    }
  }

  public getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("ONEEEEE")

      let response: ServerResponse = this.firsValueRes

      response = await this.publicationService.getOne(req.params.uuid)

      res.status(200).json(response)

    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getOne', e) })
    }
  }

  public getRelated = async (req: Request, res: Response): Promise<void> => {
    try {
      

      let response: ServerResponse = this.firsValueRes

      const dto = new GetRelated(req.params.category)
      validateOrReject(dto)
      response = await this.publicationService.getRelated(dto.category)
      

      res.status(200).json(response)

    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getOne', e) })
    }
  }
  
  
  public getAllOfUser = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Trayendo todo del usuario")
      let response: ServerResponse = this.firsValueRes

      response = await this.publicationService.getAllOfUser(req)
   
    
      res.status(response.status).json(response)
      

    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getAllOfUser', e) })
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Creando")
      console.log(req.body)

      let response: ServerResponse = this.firsValueRes
      
      const data = new CreatePublicationDTO(req.body)


      await validateOrReject(data)
      .then(async () => {
        response = await this.publicationService.create(data)
      })
      .catch(e => {
        response.msg = this.eH.validationHandler('create', e)
        })
        
        res.status(200).json(response)

      } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('create', e) })
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try { 
      

      let response: ServerResponse = this.firsValueRes
      
      const data = new UpdatePublicationDTO(req.body)

      await validateOrReject(data)
      .then(async () => {
        response = await this.publicationService.update(data)
      })
      .catch(e => {
        response.msg = this.eH.validationHandler('update', e)
        })
        
        res.status(200).json(response)

      } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('create', e) })
    }
  }

  public deletePublication = async (req: Request, res: Response): Promise<void> => {
    try {

      let response: ServerResponse = this.firsValueRes
      const publicationUuid:string = req.params.uuid
      response = await this.publicationService.delete(publicationUuid,req)

      res.status(200).json(response)

    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler('getOne', e) })
    }
  }

}

export default PublicationController
