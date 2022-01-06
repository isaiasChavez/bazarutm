import { Request, Response, NextFunction } from 'express'
import { User } from '../modules/user/user.entity'
import { Middleware } from '../types'

const getUserMid:Middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user:User = await User.findOne({
        where:{
            uuid:req.body.uuidauth
        }
    })

   
    req.body.user = user
    next()
  } catch (error) {
    console.log('error en el middleware de obtener usuario')
  }
}

export default getUserMid
