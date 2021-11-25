import {typesUser} from '../../types'
import { Role } from '../role/role.entity';

export interface CreateUserDTO{
  email: string
  name: string
  lastname: string
  birthday:Date
  gender:boolean
  type:typesUser
  password: string
  role:Role
}