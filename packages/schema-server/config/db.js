const mongoose = require('mongoose');


const dotenv = require('dotenv')


dotenv.config({ path: '../config/.env'})

const connectDB = async () =>{
  await  mongoose.connect(`mongodb://0.0.0.0:27017/graphqlAPI`).then(() =>{console.log('DB Connected')});

  console.log(`MongoDB Connected`);

}

module.exports = connectDB;