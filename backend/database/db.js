
const mongoose = require('mongoose');

//connect to database

const connectToDB = async() => {
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
    }catch(error){
        console.log(error.message);
        console.log('Failed to connect with database');
        process.exit(1);
    }
}

module.exports = connectToDB;