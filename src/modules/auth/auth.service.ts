import {ServiceReponse,ServerResponse, ENVV} from '../../types'
import {LoginDTO} from './auth.dto';
import { User } from '../user/user.entity';
import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken'
import { Service } from '../interfaces/service.interface';
import Config from '../../config/configuration';
import { SecureRequest } from '../interfaces/securerequest.class';

class AuthService extends Service{
  statusOk

  constructor () {
    super()
    this.statusOk = {
        status: 400,
        msg: 'ok'
      }
  }

  createTokenSesion = (user:User):string => {

    const dataToSign:SecureRequest={
        role:user.role.uuid,
        uuidauth:user.uuid
    }

    const jwtToken = jwt.sign(
          dataToSign,
          Config.get(ENVV.SECRET),
          {
            expiresIn:Config.timeExpireSesions,
          }
        );
      return  jwtToken
  }
  verifyUser = async (loginDTO:LoginDTO):Promise<ServerResponse> => {
    try { 
      const user:User = await User.findOne({
        where:{
          email: loginDTO.email
        },
        relations:["role"]
      })
      if (!user) {
        return {
          msg:'user does not exist',
          status:this.HTTPResponses.BadRequest
        }
      }
      console.log(loginDTO.password, user.password)
      const match = await bcrypt.compare(loginDTO.password, user.password);
      if (!match) {
          return {
          msg:'Password does not match',
          status:this.HTTPResponses.BadRequest
        }
      }
      const token:string = this.createTokenSesion(user)

      return {
        msg:"Ok",
        status:this.HTTPResponses.Ok,
        data:{token}
      }

    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("verifyUser",error)
      }
    }
  }

  logOut  = async (): Promise<ServiceReponse>=> {
    try {
   
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("logOut",error)
      }
    }
  }  
}

export default AuthService