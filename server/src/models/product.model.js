const mongoose = require('mongoose');
const { type } = require('os');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    threshold:{
        type:Number,
        required:true
    },
    leadTimeDays:{
        type:Number,
        required:true
    },
    lastRestockedDaysAgo:{
        type:Date,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Product',productSchema);