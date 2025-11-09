const PartnerModel = require("../Models/foodPartner.model");

const jwt = require("jsonwebtoken");

const partnerAuth_MiddleWare = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please, login first."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        const partner = await PartnerModel.findById(decoded.id);
        if (!partner) {
            return res.status(404).json({
                message: "Partner not found."
            });
        }

        req.partner = partner; 
        next(); 

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: error.message
        });
    }
};

module.exports ={
    partnerAuth_MiddleWare
};
