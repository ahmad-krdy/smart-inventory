const mongoose = require('mongoose');

const Stock_MovementSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    movementType:{
        type:String,
        enum:['in','out'],
        default:'in'
    },
    quantityUpdated:{
        type:Number,
        required:true,
        min:0
    },
    reason:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('StockMovement',Stock_MovementSchema);