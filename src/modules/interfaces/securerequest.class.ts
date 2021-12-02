import { IsNotEmpty, IsUUID } from 'class-validator'
export class SecureRequest {
  constructor({uuidauth,role}) {
    this.uuidauth = uuidauth
    this.role = role
  }
  @IsUUID()
  @IsNotEmpty()
  uuidauth: string

  @IsUUID()
  @IsNotEmpty()
  role: string

}
