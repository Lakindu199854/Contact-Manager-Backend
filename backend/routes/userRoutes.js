//Importing express
const express=require("express");
const { registerUser,loginUser,currentUserInfo } = require("../controller/userController");
const validateToken = require("../middlewere/validateTokenHandler");
const router = express.Router();



//Api end point to register users
router.post("/register",registerUser)

//Api end point to login users
router.post("/login",loginUser)

//Api end point to see details about current users
router.get("/current",validateToken,currentUserInfo)

module.exports = router;