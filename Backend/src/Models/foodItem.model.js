const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        trim: true,
    },
    video: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 50,
        trim: true,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PartnerModel"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
