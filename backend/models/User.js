const mongoose = require('mongoose');

//userSchema

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    role : {
      type : String,
      default : 'user',
      enum : ['user' , 'admin']
    },
    password : {
        type : String,
        required : true
    }
} , {timestamps : true});

module.exports = mongoose.model('User' , userSchema);