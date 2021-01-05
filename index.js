const express = require('express')
const cors = require('cors')
const connectDB = require('./database')


const app = express()

//DB 
connectDB()

//config
app.use(cors())
app.use(express.json({extended:true}))

const PORT = process.env.PORT || 3000
app.use("/api/auth",require('./routes/auth.route'))
app.use("/api/user",require('./routes/user.route'))


app.listen(PORT,()=>{
 console.log(`server started at port ${PORT} :)`)
})
