import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDTO {
  constructor({email,password}){
    this.email = email;
    this.password = password;
  }
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  @IsString()
  password: string
}

export class LogoutDTO {
  email: string
}
