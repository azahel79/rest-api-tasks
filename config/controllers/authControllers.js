const { compareSync } = require("bcrypt");
const { hashSync } = require("bcrypt");
const { response } = require("express");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const MODEL_USER = require("../model/authSchema");




exports.getUser = async(req = request,res = response)=>{
    try {
         
        const user = await MODEL_USER.findById(req.userId);
       
        if(!user){
           return res.status(500).json({msg: "este usuario no existe"});
        }

          res.json({user});

    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

exports.authLogin  = async(req = request,res = response)=>{
    try { 
          
          const user = await MODEL_USER.findOne({email: req.body.email});
          if(!user){
             return res.status(500).json({msg: "este usuario no existe"});
          }
          const verifyPassword = compareSync(req.body.password,user.password);
          if(!verifyPassword){
             return res.status(500).json({msg: "contraseña incorrecta"});
          }        
        
          const token=  await jwt.sign({userId: user._id},process.env.SECRET_KEY,{
            expiresIn: "1h"
        })
           

          res.json({msg: "usuario logeado",user,token})
    } catch (error) {

        console.log(error);
        return res.status(500).json({msg: error});
    }
}


exports.authRegister = async(req = request,res = response)=>{
    try {

        //HASH DE LA CONTRASEÑA
        req.body.password = hashSync(req.body.password,10);
        const newUser = new MODEL_USER(req.body);
        await newUser.save();
        
        const token=  await jwt.sign({userId: newUser._id},process.env.SECRET_KEY,{
            expiresIn: "1h"
        })
      
        res.json({msg: "crear nuevo usuario",newUser,token});
     } catch (error) {
         console.log(error);
         return  res.status(500).json({msg: error})
     }
}  