const mongoose=require("mongoose");

const foodPartner=new mongoose.Schema({
   fullName:{
    type:String,
    required:true,
   }
   ,
       email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
    }
}, 
{
    timestamps: true,
});

const PartnerModel=mongoose.model("PartnerModel",foodPartner);

module.exports=PartnerModel;