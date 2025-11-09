const express = require("express");
const router = express.Router();
const { userController,Login,Logout} = require("../Controller/user.controller");



router.post("/register", userController);
router.post("/login",Login);
router.get("/logout",Logout);

module.exports = router;