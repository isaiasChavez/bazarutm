class ErrorService {
  private className: any
  constructor(className: Object) {
    this.className = className.constructor.name
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
