import dotenv from 'dotenv'
import { ENVV } from 'src/types'

class Config {
  environment
  timeExpireSesions: number
  public corsOptions = {
    origin: 'http://example.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  constructor () {
    const variables = dotenv.config()
    if (variables.error) {
      throw new Error('.env file does not exist, please create one')
    }
    this.environment = dotenv.config().parsed
    
    if (this.environment.ENVIROMENT === 'production') {
      this.configProduction()
    } else {
      this.configDevelopment()
    }
  }

  private configProduction = () => {
    this.timeExpireSesions = 60 * 60 * 24
  }
  private configDevelopment = () => {
    this.timeExpireSesions = 60 * 60 * 24 * 30
  }

  public get (variable: ENVV): string {
    const response = this.environment[variable]
    if (!response) {
      throw new Error(
        'env variable does not exist, please be shure of create one'
      )
    }
    return response
  }
}

const config = new Config()

export default config
