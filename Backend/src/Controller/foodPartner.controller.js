const PartnerModel = require("../Models/foodPartner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const partnerAuth = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingPartner = await PartnerModel.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({
        message: "Partner already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = await PartnerModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newPartner._id },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      message: "Wow, you registered successfully.",
      partner: {
        id: newPartner._id,
        fullName: newPartner.fullName,
        email: newPartner.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


//Partner Login Logic..

const partnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const partnerExist = await PartnerModel.findOne({ email });

    if (!partnerExist) {
      return res.status(400).json({
        message: "Sorry, please input correct email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, partnerExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ id: partnerExist._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful.",
      partner: {
        fullName: partnerExist.fullName,
        email: partnerExist.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const partnerLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successfully.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout." });
  }
};

module.exports={
    partnerAuth ,
    partnerLogin,
    partnerLogout
}