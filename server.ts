import express from 'express'
import authRouter from './src/routes/auth.route'
import userRouter from './src/routes/user.route'
import { Connection, createConnection } from 'typeorm'

class Server {
  app
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
      this.lauchDataBase()
      this.lauchRoutes()
      this.lauchServer()
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
  private async lauchDataBase () {
    this.connection = await createConnection()
    if (!this.connection.isConnected) {
      throw new Error('DataBase is disconected')
    } else {
      console.log('DataBase is connected')
    }
  }
  private lauchRoutes () {
    this.app.use(this.endpoints.authentication, authRouter)
    this.app.use(this.endpoints.user, userRouter)
  }

  lauchServer () {
    this.app.listen(this.port, () => {
      return console.log(`Server is listening on ${this.port}`)
    })
  }
}

const port:number = parseInt(process.env.PORT || '3000') 

const server = new Server({port})
