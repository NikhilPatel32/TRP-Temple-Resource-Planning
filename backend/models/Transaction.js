
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date : {
        type : Date,
        default : Date.now,
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    amount : {
        type : Number,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    account : {
        type : String,
        required : true,
        trim : true
    },
    costCentre : {
        type : String,
        required : true,
        trim : true
    },
})

module.exports = mongoose.model('Transaction' , transactionSchema);