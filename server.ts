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
      this.lauchServer()
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
  private async config(){
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(json())
    this.app.use(urlencoded())  
  }
  private async lauchDataBase ():Promise<boolean> {
    const connection = await createConnection()
    if (!connection.isConnected) {
      throw new Error('DataBase is disconected'.toUpperCase())
    } else {
      connection.synchronize(); 
      console.log( 'DataBase is connected'.toUpperCase())
      this.connection = connection
      return true
    }
  }
  private lauchRoutes ():void {
    
    this.app.use(this.endpoints.authentication, authRouter)
    this.app.use(this.endpoints.user, userRouter) 

  }

  public async lauchServer ():Promise<any>{
    await this.config()
    await this.lauchDataBase()
    this.lauchRoutes()
    this.app.listen(this.port, () => {
      return console.log(`Server is listening on ${this.port}`.toUpperCase())
    })
  }
}

const port:number = parseInt(process.env.PORT || '3000') 

const server = new Server({port})