const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register Controller
const userController = async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      message: "This Email Already Exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN);

  res.cookie("token", token);
  res.status(201).json({
    message: "You Registered Successfully.",
    user: {
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
};

// Login Controller
const Login = async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    return res.status(400).json({
      message: "Something went wrong with your email or password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials.",
    });
  }

  const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_TOKEN);

  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful.",
    user: {
      fullName: isUserExist.fullName,
      email: isUserExist.email,
    },
  });
};

// Logout...

function Logout(req,resp){
  resp.clearCookie("token");
  resp.status(200).json({
    message:"Logout successfully."
  })
}

module.exports = { userController, Login , Logout};