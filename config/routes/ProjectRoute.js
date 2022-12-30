const express = require("express");
const { check } = require("express-validator");
const { getProjects, createProject, deleteProject } = require("../controllers/projectControllers");
const { globalValidations, validateToken } = require("../middlewares/validations");
const router = express.Router();  
  



router.get("/listProject/:userId",[
    check("userId","id de usuario no valido").isMongoId(),   
    globalValidations
],validateToken,getProjects);
router.post("/createProject/:userId",[
    check("userId","id de usuario no valido").isMongoId(),   
    check("project","nombre del proyecto  minimo 6 caracteres").isLength({min: 6}),
    globalValidations  
],validateToken,createProject);
router.delete("/deleteProject/:userId",[
    check("userId","id de usuario no valido").isMongoId(),
    globalValidations   
],validateToken,deleteProject);



module.exports = router;