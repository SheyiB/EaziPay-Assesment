const mongoose = require('mongoose');


const dotenv = require('dotenv')


dotenv.config({ path: './config/.env'})

const connectDB = async () =>{
  await  mongoose.connect(process.env.MONGODB_URI).then(() =>{console.log('DB Connected')});

  console.log(`MongoDB Connected`);

}

module.exports = connectDB;