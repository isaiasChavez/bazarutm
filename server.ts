import express,{Application, json, urlencoded} from 'express'
import { Connection, createConnection } from 'typeorm'
import authRouter from './src/modules/auth/auth.route'
import userRouter from './src/modules/user/user.route'
import productRoute from './src/modules/product/product.route'
import publicationRoute from './src/modules/publication/publication.route'
import categoriaRouter from './src/modules/categoria/categoria.router'
import statusproductRoute from './src/modules/product/statusproduct/statusproduct.route'
import configurationRouter from './src/modules/configuration/configuration.router'
import Config from './src/config/configuration'
import {ENVV} from './src/types';
import morgan from 'morgan'
import cors from 'cors'
import assetRoute from './src/modules/asset/asset.route'

class Server {
  private app:Application
  private connection: Connection
  private readonly endpoints = {
    baseRoute: '/',
    authentication: '/api/auth',
    user: '/api/user',
    products: '/api/product',
    sale: '/api/sale',
    publication: '/api/publication',
    config: '/api/config',
    asset: '/api/asset',
    category: '/api/category',
    statusproduct: '/api/statusproduct',
  }
  private port: number
  constructor (init: { port: number }) {
    try {
      this.app = express()
      this.port = init.port
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
    this.connection = connection
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
    this.app.use(this.endpoints.products, productRoute) 
    this.app.use(this.endpoints.publication, publicationRoute) 
    this.app.use(this.endpoints.category, categoriaRouter) 
    this.app.use(this.endpoints.config, configurationRouter) 
    this.app.use(this.endpoints.statusproduct,statusproductRoute)
    this.app.use(this.endpoints.asset,assetRoute)

    
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

const port:number = parseInt(Config.get(ENVV.PORT) || '3000') 

const server = new Server({port})

server.lauchServer()
