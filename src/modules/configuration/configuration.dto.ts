import { IsBoolean, IsNotEmpty } from "class-validator";


export class UpdateConfigurationUser{

    constructor ({instagram,telegram}) {
      
      this.instagram = instagram
      this.telegram=telegram
    }

    @IsBoolean()
    @IsNotEmpty()
    instagram:boolean;

    @IsBoolean()
    @IsNotEmpty()
    telegram:boolean;

  
  }
  