const User = require('../models/User')
const bcryptjs =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Code_BadRequest,Code_InternalError,EXPIRE_TIME} = require('../types')
const { MSG_user404, MSG_pass401, MSG_auth200 } = require( '../types/responses' )


const { validationResult } = require( 'express-validator' )




exports.authenticateUser = async (req,res) =>{
  console.log('autenticando')
  const {email,password} = req.body
  try {
    console.log(email,password)
     let user = await User.findOne({ email });
     console.log(user, "object");

    if (!user) {
      return res.status(Code_BadRequest).json({msg:MSG_user404})
    }
    //revisamos password

    const passOk = await bcryptjs.compare(password,user.password)

    if (!passOk) {
     return res.status(Code_BadRequest).json({
      msg:MSG_pass401
     })
    }

    const payload  = {
     user:{
      id:user._id
     }
    }

    jwt.sign(payload,process.env.SECRETWORD,{
     expiresIn:EXPIRE_TIME
    },
     (error,token)=>{
        if (error) {
           throw error
        }
        //mensaje de confirmación
        res.json({ 
         msg:MSG_auth200,
         token })
     }
    
    )
  } catch (e) {
   console.log("Error al autenticar usuario")
   res.status(Code_InternalError).json({
    msg: MSG_ERROR-AUTH
   })
  }
}

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(Code_InternalError).json({ msg:MSG_ERROR-AUTH});
  }
};


exports.createUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password, name } = req.body;

  //Validamos que el usuario y correo sean unicos

  try {
    let uniqueEmail = await User.findOne( { email } );
    
    if (uniqueEmail) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }
    //crear el nuevo usuario

    let usuario = new User(req.body);

    //Hashear el password

    const salt = await bcryptjs.genSalt(10);

    usuario.password = await bcryptjs.hash(password, salt);

    await usuario.save();

    //Crear y firmar un JWT

    const payload = {
      user: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETWORD,
      {
        expiresIn: EXPIRE_TIME,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        //mensaje de confirmacion
        res.json({ msg: "Usuario agregado correctamente",token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};