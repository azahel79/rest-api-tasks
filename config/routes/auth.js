const express = require("express");
const { check } = require("express-validator");
const { authLogin, authRegister, getUser } = require("../controllers/authControllers");
const { globalValidations, verifyExistingEmail, validateToken } = require("../middlewares/validations");
const route = express.Router();

  
       
      
route.get("/user",validateToken,getUser);       
route.post("/login",[
  check("email","escribe un email valido").isEmail(),
  check("password","escribe la contraseña").not().isEmpty(), 
  globalValidations
],authLogin);
route.post("/register",[
  check("nombre","nombre del usuario  minimo 5 caracteres").isLength({min: 5}),
  check("email","escribe un email valido").isEmail(),
  check("email").custom(verifyExistingEmail),
  check("password","escribe una contraseña con 6 caracteres minimo").isLength({min: 6}), 
  globalValidations
],authRegister)
   


module.exports = route;



