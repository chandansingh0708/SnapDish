require("dotenv").config();
const app = require("./src/createServer");
const foodDatabase = require("./src/Database/db");

foodDatabase();



app.listen(3000, () => {
  console.log("Hii, your port is running at the 3000");
});