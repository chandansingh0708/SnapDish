const express=require("express");
const router=express.Router();
const { partnerAuth ,partnerLogin,partnerLogout}=require("../Controller/foodPartner.controller");


router.post("/partner/register",partnerAuth);
router.post('/partner/login',partnerLogin);

router.get("/partner/logout",partnerLogout);

module.exports=router;