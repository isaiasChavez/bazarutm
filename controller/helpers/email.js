const nmailer = require('nodemailer')
const path = require('path')
const config = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'heidi.roob54@ethereal.email',
    pass: '55KMWcQhQVHvkFBWj2'
  }
}
const plantilla = `
 <div style="width:100%; height:20rem; display:flex; justify-content:center; align-items:center;" >
     <div>
     <h1>Gracias por participar en la actividad</h1>
     </div>
 </div>
`
const plantillaConfirmar = `
 <div style="width:100%; height:20rem; display:flex; flex-direction:column; justify-content:center; align-items:center;" >
     <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
     <h1>Por favor confirma tu entrada a esta actividad</h1>
     <h3>Juego 2</h3>
     <a href="https://www.google.com/" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Confirmar entrada </a>
     </div>
 </div>
`
// {/* <a href="https://devscaperooms.netlify.app/restore/t=${token}" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Recuperar </a> */}

const plantillaRecover = token => {
  return `
 <div style="width:100%; height:20rem; display:flex; flex-direction:column; justify-content:center; align-items:center;" >
     <div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
     <h1>Da click al siguente enlace para recuperar tu contraseña AMGEN.</h1>
     <h5>Si no has realizado esta petición ignora este mensaje.</h5>
     <a href="https://devscaperooms.netlify.app/restore/${token}" style="font-weight:bold; text-decoration:none;cursor:pointer; border-radius:6px; padding:0.5rem; background:blue; color:white;"> Recuperar </a>
     </div>
 </div>
`
}

const mailOptions = {
  recover: {
    from: 'Equipo AMGEN',
    to: 'isaiaschavez.co@gmail.com',
    subject: 'Recuperación de contraseña',
    text: 'Recupera tu contraseña',
    html: ''
  },
  confirmParticipation: {
    from: 'Equipo AMGEN',
    to: 'isaiaschavez.co@gmail.com',
    subject: 'Confirmar participáción en {game}',
    text: 'Confirma tu participación en el juego {namegame}',
    html: plantillaConfirmar
  }
}

const getMailOptions = ({ to, type, token }) => {
  let mailOptionsToSend = mailOptions[type]

  if (type === 'recover') mailOptionsToSend.html = plantillaRecover(token)

  mailOptionsToSend.to = to
  return mailOptionsToSend
}

exports.sendEmail = async (res, options) => {
  try {
    const transporter = nmailer.createTransport(config)
    transporter.sendMail(getMailOptions(options), (error, info) => {
      if (error) {
        res.status(500).send(error.message)
      } else {
        console.log('Email enviado')
        res.status(200).json({
          info
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Ocurrió un error al enviar el mensaje' })
  }
}

exports.sendEmailRecover = async (res, options) => {
  try {
    const transporter = nmailer.createTransport(config)
    transporter.sendMail(getMailOptions(options), (error, info) => {
      if (error) {
        res.status(500).send(error.message)
      } else {
        console.log('Email de recuperación enviado')
        res.status(200).json({
          info
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Ocurrió un error al enviar el mensaje' })
  }
}
