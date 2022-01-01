import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsRFC3339, IsString, Max, MaxLength, Min, MinLength, IsUUID } from 'class-validator';
import { SecureRequest } from '../interfaces/securerequest.class';
export class GetUserProfileDTO{
  constructor (email:string) {
    this.email = email
  }
  @IsEmail()
  @IsNotEmpty()
  email: string
}
export type Profile = {
  birthday: string;
  gender: boolean;
  instagram: string;
  lastname: string;
  name: string;
  email: string;
  phonenumber: number;
  telegram:string,
};
export class GetUserLoggedProfileDTO{
  constructor (UUID:string) {
    this.UUID = UUID
  }
  @IsUUID()
  @IsNotEmpty()
  UUID: string
}



export class UpdateUserDTO {
  constructor ({name,lastname,email,birthday,phonenumber,gender,password,uuidauth,role}) {
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