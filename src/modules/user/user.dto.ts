import {typesUser} from '../../types'

export interface CreateUserDTO{
  email: string
  nickname: string
  birthday:Date
  password: string
  genero:boolean
  active:boolean
  avatar:string
  type:typesUser
}