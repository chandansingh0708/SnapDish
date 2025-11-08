const express=require("express");
const router=express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const  {partnerAuth_MiddleWare}= require("../middleware/partner.middleware");
const {foodController}=require("../Controller/food.controller")

router.post("/", partnerAuth_MiddleWare, upload.single("file"), foodController);
module.exports=router