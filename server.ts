import express from 'express'
import authRouter from './src/routes/auth.route'
import userRouter from './src/routes/user.route'
import { createConnection } from 'typeorm'

const app = express()
const port = 3000

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const main = async () => {
  try {
    const connection = await createConnection()
    if (!connection.isConnected) {
      throw new Error("DataBase is disconected"); 
    }else{
      console.log("DataBase is connected"); 
    }
    app.listen(port, () => {
      console.log("================================")
      return console.log(`Server is listening on ${port}`)
    })
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
main()
