const express = require('express')
const router = express.Router()
const { check } = require("express-validator");

const authMid =  require('../middleware/auth')
const AuthController =  require('../controller/auth.controller')


router.post("/",
[check("email", "El email es obligatorio").not().isEmpty(),
check("password", "El password es obligatorio").not().isEmpty()
],

 AuthController.authenticateUser )

router.post("/create",
 [
  check( "name", "El nombre es obligatorio" ).not().isEmpty(),
  check( "email", "El email es obligatorio" ).not().isEmpty(),
  check("password", "El password es obligatorio").not().isEmpty()
],authMid,

  AuthController.createUser )

router.post("/recover",
 [
  check( "email", "El email es obligatorio" ).not().isEmpty()
],
AuthController.recover)

router.post("/restore",
 [
  check( "password", "El password es obligatorio" ).not().isEmpty()
],authMid,
AuthController.restore)


router.get("/",authMid,AuthController.authenticatedUser)

module.exports = router