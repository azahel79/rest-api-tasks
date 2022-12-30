  
const mongoose = require("mongoose");
exports.connectDB = async()=>{    
                  
  try {     
    await mongoose.connect(process.env.URI);
    console.log("conectado en la base de datos de mongoDB");
  } catch (error) {
       console.log(error);
  }   
}