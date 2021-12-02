import { Request, Response, NextFunction } from 'express'
import { SecureRequest } from '../modules/interfaces/securerequest.class'
import JWT, { JwtPayload } from 'jsonwebtoken'
import config from '../config/configuration'
import { ENVV } from '../types'
import { validateOrReject } from 'class-validator'
import { HTTPResponses,Middleware } from '../types'

const authMid:Middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let secureRequest: SecureRequest
    const payload = req.header('authorization')
    if (!payload) {
      return res
        .status(HTTPResponses.Unauthorized)
        .json({ msg: 'No hay token, permiso no valido' })
    }

    const token = payload.replace('Bearer ', '')

    try {
      const cifrado = JWT.verify(token, config.get(ENVV.SECRET)) as JwtPayload
      const data: SecureRequest= {
        uuidauth: cifrado.uuidauth,
        role:cifrado.role
      }
      secureRequest = new SecureRequest(data)

      console.log({ secureRequest, cifrado })
    } catch (error) {
      return res
        .status(HTTPResponses.Unauthorized)
        .json({ msg: 'Invalid token' })
    }
    try {
      validateOrReject(secureRequest)
      console.log('Si lo validó correctamente')
    } catch (error) {
      return res
        .status(HTTPResponses.Unauthorized)
        .json({ msg: 'Invalid token some fields are invalid' })
    }
    req.body.uuidauth = secureRequest.uuidauth
    
    next()
  } catch (error) {
    console.log('error en el middleware')
  }
}

export default authMid
