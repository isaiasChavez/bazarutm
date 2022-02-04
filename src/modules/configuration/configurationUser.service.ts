import { ServerResponse, ServiceReponse } from '../../types'
import AssetService from '../asset/asset.service'
import { Service } from '../interfaces/service.interface'
import UserService from '../user/user.service'
import { Request } from 'express'
import { UpdateConfigurationUser } from './configuration.dto'
import { ConfigurationUser } from './configurationUser.entity'

class ConfigurationUserService extends Service {
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

  async update(dto:UpdateConfigurationUser,req:Request): Promise<ServerResponse> {
    try {

      const user= req.body.user

      const configuration:ConfigurationUser = req.body.user.configurationUser

      console.log({user,configuration});

      configuration.instagram =  dto.instagram
      configuration.telegram =  dto.telegram 

      await ConfigurationUser.save(configuration)
      const {id:__,...resConfig} =configuration
      return {
        msg: 'ok',
        status: this.HTTPResponses.Ok,
        data:resConfig
      }
    } catch (error) {
      console.log({error});
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('create', error),
      }
    }
  }

  async get(req:Request): Promise<ServerResponse> {
    try {

      const configuration:ConfigurationUser = req.body.user.configurationUser

      return {
        msg: 'ok',
        status: this.HTTPResponses.Ok,
        data:configuration
      }
      
    } catch (error) {
      console.log({error});
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler('create', error),
      }
    }
  }

}

export default ConfigurationUserService
