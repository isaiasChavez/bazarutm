import { Router } from "express";
import { Controller } from "src/modules/interfaces/service.interface";
import { Request, Response, NextFunction } from 'express'


export enum typesUser {
  admin = 'ADMIN',
  user = 'USER'
}
export enum Roles {
  admin = 'ADMIN',
  user = 'USER'
}

export type Middleware = (req:Request,res:Response,next:NextFunction)=> void

export enum StatusProductEnum {
  USADO = 'USADO',
  NUEVO = 'NUEVO',
  ENPAQUETADO = 'ENPAQUETADO'
}

export enum HTTPResponses {
  Ok = 200,
  OkCreated = 201,
  OkNoContent = 204,
  OkReset = 205,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalError = 500
}

export enum CategoriesEnum {
  Clothes = 'Clothes',
  Others = 'Others'
}

export interface RouterInterface  {
  router: Router
  controller: Controller  
  globalMidleware:Middleware[] 
}

export interface ServiceReponse {
  status: number
  msg: string
}

export enum ENVV {
  PORT = 'PORT',
  SECRET = 'SECRET'
}

export interface ServerResponse extends ServiceReponse {
  data?: any
}
