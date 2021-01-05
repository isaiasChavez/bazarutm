const mongoose = require('mongoose')

require('dotenv').config({path:".env"})
const URI = process.env.DATABASE || "mongodb://localhost/scaperooms" 
const mdbConfig =  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
const connectDB = async ()=>{
 try {
   await mongoose.connect(URI, mdbConfig)

 } catch (error) {
    console.log("Error conecting DB:", error);
    process.exit(1); //En caso de error se detiene la app 
 }
}
const connection = mongoose.connection

connection.once("open", () => {
  console.log("Data base is connected");
});



module.exports = connectDB;

