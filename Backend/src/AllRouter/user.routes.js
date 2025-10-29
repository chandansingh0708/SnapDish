const express = require("express");
const router = express.Router();
const { userController,Login,Logout} = require("../Controller/user.controller");



router.post("/user/register", userController);
router.post("/user/login",Login);
router.get("/user/logout",Logout);

module.exports = router;