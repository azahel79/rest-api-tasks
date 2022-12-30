const express = require("express");
const { check } = require("express-validator");
const { createTask, deleteTask, listTask, editTask, editStateTask } = require("../controllers/TaskControllers");
const { validateToken, globalValidations } = require("../middlewares/validations");
const router = express.Router();

router.get("/listTask/:userId",[
    check("userId","id de usuario no valido").isMongoId(),   
         globalValidations],validateToken,listTask);
router.post("/createTask/:userId",[
   check("userId","id de usuario no valido").isMongoId(),   
    globalValidations],validateToken,createTask);
router.put("/editTask/:userId",
    [
        check("userId","id de usuario no valido").isMongoId(),   
         globalValidations
     ], 
validateToken,editTask);
router.delete("/deleteTask/:userId",[
    check("userId","id de usuario no valido").isMongoId(),   
         globalValidations
],validateToken,deleteTask);
router.put("/editStateTask/:userId",[
    check("userId","id de usuario no valido").isMongoId(),   
         globalValidations
],validateToken,editStateTask);




module.exports = router;