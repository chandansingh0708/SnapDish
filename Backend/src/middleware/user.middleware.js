const User=require("../Models/user.model");
const jwt=require("jsonwebtoken");

const userAuth_Middleware=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message:"Please, login first.",
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        const LoginUser=await User.findById(decoded.id);
            if (!LoginUser) {
            return res.status(404).json({
                message: "Partner not found."
            });
        }
        req.user=LoginUser;
        next();

    }
   catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: error.message
        });
}
};

module.exports=userAuth_Middleware;