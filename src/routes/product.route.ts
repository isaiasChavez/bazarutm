import express from 'express'
import authMid from '../middleware/auth'
import { check } from "express-validator"
import ProductController from '../controller/product.controller'
const router = express.Router()

const productController = new ProductController()

router.post( "/",productController.addProduct )
 
export default router