const nodemailer = require('./helpers/email')
const User = require( '../models/User' )
const bcryptjs =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Code_BadRequest,Code_InternalError,EXPIRE_TIME} = require('../types')
const { MSG_user404, MSG_pass401, MSG_auth200 } = require( '../types/responses' )



const { validationResult } = require( 'express-validator' )

exports.addUsers = async (req,res) =>{
  try {    
    nodemailer.sendEmail(req,res)

  } catch (e) {
   
  }
}

