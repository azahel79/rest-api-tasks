const { connectDB } = require("../db/connectDB");


  
class App{
    constructor(){
        this.express = require("express");
        this.app = this.express();
        this.cors = require("cors");
        this.path = require("path");
        require("dotenv").config({path:this.path.join(__dirname,"../../.env")});
    }

      conectedDB(){
          connectDB();   
    }
    controllers(){
        this.app.set("port",process.env.PORT);
    }

    middlewares(){
        this.app.use(this.express.json());
        this.app.use(this.express.urlencoded({extended:false}));
        this.app.use(this.cors());
    }     


     routes(){
            this.app.use("/",require("../routes/auth"));
            this.app.use("/",require("../routes/tasksRoute"));
            this.app.use("/dashboard",require("../routes/ProjectRoute"));
            this.app.use("/dashboard",require("../routes/tasksRoute"))
     }

     listen(){ 
         this.app.listen(this.app.get("port"),()=>{
             console.log(`server in port ${this.app.get("port")}`);  
         });
     }

}

module.exports = App;