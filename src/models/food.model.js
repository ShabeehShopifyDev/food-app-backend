const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },
   description: {
    type: String
   },
   videoUrl: {
     type: String,
     required: true
   },
   foodPartner: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "Partners"
   }
}, { timestamps: true });

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
