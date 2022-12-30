const { request,response } = require("express");
const MODEL_PROJECT = require("../model/projectSchema");
const MODEL_USER = require("../model/authSchema");
exports.getProjects = async(req = request,res = response)=>{
    
    
    try {

        const user = await MODEL_USER.findById(req.params.userId);
         ///VERIFY EXISTING USER
         if(!user){
              return res.status(400).json({msg: "usuario no existente"}); 
         }
        
         //CHECK IF THE DATA MATCHES
         if(req.userId !== user._id.toString()){
            return res.status(400).json({msg: "error en los datos"})   
         }
         


         const projects = await MODEL_PROJECT.find({userId: user._id});
         res.json({msg: "obtener los proyectos",projects})
     } catch (error) {
         return res.status(500).json({msg: "hubo un error"});
     }
}
exports.createProject = async(req = request,res = response)=>{
    try {
        const user = await MODEL_USER.findById(req.params.userId);
         ///VERIFY EXISTING USER
         if(!user){
              return res.status(400).json({msg: "usuario no existente"}); 
         }
         //CHECK IF THE DATA MATCHES
         if(req.userId !== user._id.toString()){
            return res.status(400).json({msg: "error en los datos"})   
         }

          //CREATE NEW PROJECT
           const createProyect = new MODEL_PROJECT({...req.body,userId: user._id});
           await createProyect.save();
         res.json({msg: "crear proyecto", project: createProyect})
     } catch (error) {
         console.log(error);
         return res.status(500).json({msg: "hubo un error"});
     }  
}
exports.deleteProject = async(req = request,res = response)=>{
    try {
        const user = await MODEL_USER.findById(req.params.userId);
     ///VERIFY EXISTING USER
     if(!user){
          return res.status(400).json({msg: "usuario no existente"}); 
     }
    
     //CHECK IF THE DATA MATCHES
     if(req.userId !== user._id.toString()){
        return res.status(400).json({msg: "error en los datos"})   
     }

 
    //VERIFY EXISTING PROJECT AND DELETE 
    const project = await MODEL_PROJECT.findById(req.body.projectId);
       if(!project){
           return res.status(500).json({msg: "este proyecto ya no existe"})
       }
     await MODEL_PROJECT.findByIdAndDelete(project._id);
         res.json({msg: "eliminar proyecto"})
     } catch (error) {



         return res.status(500).json({msg: "hubo un error"});
     }
}
