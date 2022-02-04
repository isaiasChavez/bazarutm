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
    /* const variables = dotenv.config()
    if (variables.error) {
      throw new Error('.env file does not exist, please create one')
    } */


    this.environment = process.env
    console.log(this.environment);
    
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

 
}

const config = new Config()

export default config
