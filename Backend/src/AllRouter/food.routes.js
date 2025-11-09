const express=require("express");
const router=express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const  {partnerAuth_MiddleWare}= require("../middleware/partner.middleware");
const {foodController,getFood}=require("../Controller/food.controller");
const userAuth_Middleware=require("../middleware/user.middleware")

router.post("/", partnerAuth_MiddleWare, upload.single("file"), foodController);
router.get("/",userAuth_Middleware,getFood)
module.exports=router