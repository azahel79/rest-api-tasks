  
const mongoose = require("mongoose");
exports.connectDB = async()=>{    
                  
  try {     
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("conectado en la base de datos de mongoDB");
  } catch (error) {
       console.log(error);
       throw new Error("no se conecto ala base de datos");
  }   
}