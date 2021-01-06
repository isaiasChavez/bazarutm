const User = require('../models/User')
const bcryptjs =  require('bcryptjs')
const jwt = require( 'jsonwebtoken' )
const nodemailer = require('./helpers/email')


const {Code_BadRequest,Code_InternalError,EXPIRE_TIME,EXPIRE_TIME_EMAIL,EXPIRE_TIME_PASS_CHANGE} = require('../types')
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
        id:uniqueEmail._id
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



//Manda el correo pero no hace el cambio de contraseña
exports.recover = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email} = req.body;
  //Validamos que el usuario exista
  try {
    let user = await User.findOne( { email } );
    if (!user) {
      return res.status(400).json({ msg: "Si existe un usuario con este correo llegará un email para hacer el cambio." });
    }
    //Crear y firmar un JWT

    const payload = {
      user: {
        id: user._id,
        recover:true
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETWORD,
      {
        expiresIn: EXPIRE_TIME_PASS_CHANGE,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        //Enviar correo de recuperación
        nodemailer.sendEmailRecover(res,{to:email,type:'recover',token})

        //mensaje de confirmacion
        res.json({ msg: "Si existe un usuario con esta correo se enviará un correo para realizar el cambio.",token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

//Cambia la contraseña
exports.restore = async ( req, res ) => {

  const errores = validationResult(req);
  const isRecover = req.user.recover
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  if(!isRecover) return res.status(405).json({ errores:'no permitido'});
  const idUser = req.user.id
  
  const { password } = req.body;
  //Validamos que el usuario exista
  try {
    let user = await User.findOne( { _id: idUser } );
    console.log("Usuario encontrado: ",user);
    if (!user) {
      return res.status(400).json({ msg: "No existe un usuario con el id proporcionado." });
    }
    
    const salt = await bcryptjs.genSalt(10);
    let newpassword = await bcryptjs.hash(password, salt);
    
    const responseUpdate = await User.findOneAndUpdate( idUser, { password:newpassword } );
    console.log("responseUpdate: ",responseUpdate);

    res.status(200).json({ msg: "La contraseña se ha actualizado correctamente",status:"ok" });  
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};


