import express,{Application, json, urlencoded} from 'express'
import authRouter from './src/routes/auth.route'
import userRouter from './src/routes/user.route'
import { Connection, createConnection } from 'typeorm'
import morgan from 'morgan'
import cors from 'cors'

class Server {
  app:Application
  connection: Connection
  endpoints = {
    baseRoute: '',
    authentication: '/api/auth',
    user: '/api/user'
  }
  port: number
  constructor (init: { port: number }) {
    try {
      this.app = express()
      this.port = init.port
      this.config()
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
  private config():void{
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(json())
    this.app.use(urlencoded())
      this.lauchDataBase()
      this.lauchRoutes()
  }
  private async lauchDataBase ():Promise<void> {
    this.connection = await createConnection()
    if (!this.connection.isConnected) {
      throw new Error('DataBase is disconected')
    } else {
      console.log('DataBase is connected')
    }
  }
  private lauchRoutes ():void {
    this.app.use(this.endpoints.authentication, authRouter)
    this.app.use(this.endpoints.user, userRouter)
  }

  public lauchServer ():void {
    this.app.listen(this.port, () => {
      return console.log(`Server is listening on ${this.port}`)
    })
  }
}

const port:number = parseInt(process.env.PORT || '3000') 

const server = new Server({port})
server.lauchServer()