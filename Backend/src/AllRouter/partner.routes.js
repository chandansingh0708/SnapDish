const express=require("express");
const router=express.Router();
const { partnerAuth ,partnerLogin,partnerLogout}=require("../Controller/foodPartner.controller");


router.post("/register",partnerAuth);
router.post('/login',partnerLogin);

router.get("/logout",partnerLogout);

module.exports=router;