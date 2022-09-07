const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/medMinder"

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI);
  console.log("mogo connect ")
}


module.exports=connectToMongo;