import { ValidationError } from "class-validator"

class ErrorService {
  private className: any
  constructor(className: Object) {
    this.className = className.constructor.name
  }



  validationHandler(trigger: string, error: ValidationError[], message?: string): string {
    let errorString:string = "The following fields have irregularities: " 
    error.map((error:ValidationError)=>{
      errorString += `- ${error.property}: `
      for (const key in error.constraints)errorString += ` ${key} `
      errorString += ` - `
    })
    return errorString
  }

  
  genericHandler(trigger: string, error: Error, message?: string): string {
    return this.genericHandlerDevelopment(trigger, error, message)
  }
  private genericHandlerDevelopment(
    trigger: string,
    error: Error,
    message?: string
  ): string {
    const realMessage: string = message ? message : error.message
    console.log('===========')
    console.log(
      `${realMessage} | An error has occurred on: ${this.className} - ${trigger} `
    )
    console.log('===========')
    return realMessage
  }
  private genericHandlerProduction(trigger: any, message: string, error: any) {}

  public serviceHandler(trigger: string, message?: string): string {
    console.log('**********')
    console.log(`${message} | An error has occurred on: ${this.className} - ${trigger} `)
    console.log('===========')
    return message
  }
}
export default ErrorService
