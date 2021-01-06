const nmailer = require('nodemailer')
// const path = require( 'path' )
const plantillas = require('./pantillas')


const config = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jody.heathcote@ethereal.email',
        pass: 'UvKFwZbQGEDeFA8Qjw'
    }
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
        html: plantillas.plantillaConfirmar
    }
}

const getMailOptions = ({ to, type, token }) => {
    let mailOptionsToSend = mailOptions[type]

    if (type === 'recover') mailOptionsToSend.html = plantillas.plantillaRecover(token)

    mailOptionsToSend.to = to
    return mailOptionsToSend
}

exports.sendEmail = async(res, options) => {
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

exports.sendEmailRecover = async(res, options) => {
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