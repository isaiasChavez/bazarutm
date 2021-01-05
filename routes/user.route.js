const express = require('express')
const router = express.Router()
const { check } = require("express-validator");

const authMid =  require('../middleware/auth')
const UserController =  require('../controller/user.controller')


router.post( "/",
 authMid,
 UserController.addUsers )
 


// router.get("/",authMid,AuthController.authenticatedUser)

module.exports = router