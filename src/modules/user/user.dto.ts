import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsRFC3339, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { SecureRequest } from '../interfaces/securerequest.class';
export class GetUserProfileDTO{
  constructor (email:string) {
    this.email = email
  }
  @IsEmail()
  @IsNotEmpty()
  email: string
}


export class UpdateUserDTO extends SecureRequest{
  constructor ({name,lastname,email,birthday,phonenumber,gender,password,uuidauth,role}) {
    super({uuidauth,role})
    this.name = name
    this.lastname = lastname
    this.birthday = birthday
    this.phonenumber = phonenumber
    this.gender = gender
    this.password = password
    this.email = email
  }
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  name: string
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  lastname: string
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(200)
  phonenumber:string
  birthday:Date
  @IsNotEmpty()
  @IsBoolean()
  gender:boolean
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(200)
  password: string

  
}

export class CreateUserDTO extends UpdateUserDTO{
  constructor ({email,name,lastname,birthday,phonenumber,gender,password,role,uuidauth,}) {
    super({name,lastname,email,birthday,phonenumber,gender,password,uuidauth,role})
  }

}