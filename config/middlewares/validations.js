const { request,response } = require("express");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const MODEL_USER = require("../model/authSchema");

exports.globalValidations = async(req = request,res = response,next)=>{
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(500).json(errors.array())
    }
    next();
    } catch (error) {
        console.log(error);
    }
}

exports.verifyExistingEmail = async(email)=>{
  const user = await MODEL_USER.findOne({email});  
  if(user){
      throw new Error("este email ya existe");
  }
}

exports.validateToken = async(req = request,res = response,next)=>{  
    const token =  req.header("auth__user");
    if(!token){
      return res.status(500).json({msg: "no existe el token"});
    }

    try {
         const verifyToken = await jwt.verify(token,process.env.SECRET_KEY);
         req.userId = verifyToken.userId; 
         next();

    } catch (error) {
     return res.status(500).json({msg: "token no valido"})
    }
}   


