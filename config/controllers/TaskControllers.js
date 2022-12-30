const { request,response } = require("express");
const MODEL_USER = require("../model/authSchema");
const MODEL_PROJECT = require("../model/projectSchema");
const MODEL_TASK = require("../model/taskSchema");
exports.createTask = async(req = request,res = response)=>{


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
    
       
         ///VERIFY EXISTING PROJECT
        const project = await MODEL_PROJECT.findById(req.body.projectId);
    
           if(!project){
               return res.status(500).json({msg: "este proyecto ya no existe"})
           }


           const createTask = new MODEL_TASK({...req.body,userId: user._id,projectId: project._id});
           await createTask.save();
          res.json({msg: "crear una tarea",task: createTask});
      } catch (error) {
          console.log(error);
          return res.status(500).json({msg: "hubo un error"});
      }
}


exports.deleteTask = async(req = request,res = response)=>{
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
        const project = await MODEL_PROJECT.findById(req.body.projectId);
           if(!project){
               return res.status(500).json({msg: "este proyecto ya no existe"})
           }
    
           ///VERIFY TASKK TO PROYECT AND USER
          const taskUser = await MODEL_TASK.find({projectId: project._id});
          const taskDelete = taskUser.find(t=> t._id.toString()  === req.body.taskId); 
      
            if(!taskDelete){
                return res.status(500).json({msg: "no existe la tarea"});
            }
          //DELETE TASK
            await MODEL_TASK.findByIdAndDelete(taskDelete._id);
            res.json({msg: "eliminar tarea"});
      } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "hubo un error"});
      }
}

exports.listTask = async(req = request,res = response)=>{
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
    const project = await MODEL_PROJECT.findById(req.body.projectId);
       if(!project){
           return res.status(500).json({msg: "este proyecto ya no existe"})
       }
       ///VERIFY TASKK TO PROYECT AND USER
      const taskUser = await MODEL_TASK.find({projectId: project._id});
      res.json({msg: "lista de tareas",tasks: taskUser});
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "hubo un error"});
  }
}


exports.editTask = async(req = request,res = response)=>{


     try {  
       
      const {task} = req.body;
      const user = await MODEL_USER.findById(req.params.userId);
    
       ///VERIFY EXISTING USER
       if(!user){
            return res.status(400).json({msg: "usuario no existente"}); 
       }
       //CHECK IF THE DATA MATCHES  
       if(req.userId !== user._id.toString()){
          return res.status(400).json({msg: "error en los datos"})   
       }

        ///VERIFY EXISTING PROJECT
      const project = await MODEL_PROJECT.findById(req.body.projectId);
         if(!project){
             return res.status(500).json({msg: "este proyecto ya no existe"})
         }
           
         ///VERIFY EXISTING TASK
         const tasks = await MODEL_TASK.findById(req.body.taskId);
         if(!tasks){
           return res.status(500).json({msg: "no existe esta tarea"});
         }    

         ///EDIT TASK
          const edit = await MODEL_TASK.findByIdAndUpdate(req.body.taskId,{task});
          res.json({msg: "editado la tarea",editTask:edit});
         
     } catch (error) {
       console.log(error);
          return res.status(500).json({msg: "hubo un error"})
     }
}


exports.editStateTask = async(req = request,res = response)=>{
  
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

     ///VERIFY EXISTING PROJECT
   const project = await MODEL_PROJECT.findById(req.body.projectId);
      if(!project){
          return res.status(500).json({msg: "este proyecto ya no existe"})
      }
        
      ///VERIFY EXISTING TASK
      let tasks = await MODEL_TASK.findById(req.body.taskId);
      if(!tasks){
        return res.status(500).json({msg: "no existe esta tarea"});
      }   

  
      
      if(tasks.estado){
          tasks.estado = false;
      }else{
       tasks.estado = true;
      }
        

        await MODEL_TASK.findByIdAndUpdate(tasks._id,{estado: tasks.estado}); 
      res.json({msg: "editando el estado"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "hubo un error"});
  }
}