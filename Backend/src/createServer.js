const express = require("express");
const cookieParser = require("cookie-parser"); 
const userAuth = require("./AllRouter/user.routes");
const partnerDetail=require("./AllRouter/partner.routes")
const app = express();
app.use(express.json());

app.use(cookieParser()); 


app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/api/user", userAuth);
app.use("/api/partner", partnerDetail);

module.exports = app;