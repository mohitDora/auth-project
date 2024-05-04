const express=require("express");
const authcontrollers=require("../controllers/auth-controller");
const router=express.Router();

router.route("/register").post(authcontrollers.register)
// router.route("/login").post(authcontrollers.login)
router.route("/user/:uid").get( authcontrollers.user)

module.exports=router;