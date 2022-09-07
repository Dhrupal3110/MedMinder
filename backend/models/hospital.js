const mongoose = require("mongoose");
const { Schema } = mongoose;
const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
//   phone:{
//     type:Number,
//     minlength:10,
//     maxlength:10
//   },
  Address:{
    type:String,
    required:false
  }
});
const User = mongoose.model("hospital", HospitalSchema );
module.exports = User; 