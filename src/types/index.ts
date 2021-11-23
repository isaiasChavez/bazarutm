export interface ServerResponse {
  msg: string,
  status:number
  data:any
}

export enum typesUser {
  admin = 'ADMIN',
  user = 'USER'
}

export interface ServiceReponse {
  status: number
  msg: string
}