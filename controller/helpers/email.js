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

const mailOptions = {
  from: 'Remitente',
  to: 'isaiaschavez.co@gmail.com',
  subject: 'pdf',
  text: 'pdf',
 html: plantillaConfirmar,
 attachments:[{
       filename: 'file.pdf',
       path: path.join(__dirname,'assets/pddf.pdf') ,
       contentType: 'application/pdf'
  }]
}







exports.sendEmail = async (req,res) => {
  try {
   const transporter = nmailer.createTransport( config )
   
    transporter.sendMail(mailOptions, (error, info) => {
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
