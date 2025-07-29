const mongoose = require('mongoose');

const InventoryAlertSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    level:{
        type:String,
        enum:['critical','high','medium','low'],
    },
    message:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('InventoryAlert',InventoryAlertSchema);