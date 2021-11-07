import express from'express'
import { check } from "express-validator"
import authMid from '../middleware/auth'
import UserController from '../controller/user.controller'

const router = express.Router()

router.post( "/",
 authMid,
 UserController.addUsers )
 


// router.get("/",authMid,AuthController.authenticatedUser)

export default router