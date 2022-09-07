const mongoose = require("mongoose");
const { Schema } = mongoose;
const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    minlength:10,
    maxlength:10
  },
  Specialization:{
    type:String,
    required:false
  },
  City:{
    type:String,
    required:false
  }
});
const User = mongoose.model("doctors", DoctorSchema );
module.exports = User; 