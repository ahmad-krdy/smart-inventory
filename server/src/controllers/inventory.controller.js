const Product = require('../models/product.model');
const StockMovement = require('../models/stock_movement.model');
const InventoryAlert = require('../models/inventory_alert.model');
const generateAlerts = require('../utils/alert.utils');


exports.getProducts = async (req, res) => {
    try {
          const products = await Product.find();
          return res.status(200).json({status:"success",message:"Product fectched succesfully!",data:{products}});
 
    } catch (error) {
          return res.status(500).json({status:"error",message: error.message });
    }

};

exports.stockUpdating = async (req, res) => {
    try {
            const { product_id, movement_type, quantity_update, reason } = req.body;
            
            if(!product_id || !movement_type || !quantity_update || !reason) throw new Error("All field are required!");

            const product = await Product.findById(product_id);
            if (!product) throw new Error("Product not found!")

            if (movement_type === 'in') {
              product.stock += quantity_update;
              product.lastRestockedDaysAgo = new Date();
            } else if (movement_type === 'out') {
              product.stock -= quantity_update;
            }

            await product.save();

            const movement = new StockMovement({
              productId:product_id,
              movementType:movement_type,
              quantityUpdated:quantity_update,
              reason
            });

            await movement.save();
            await generateAlerts(product);

            return res.status(200).json({status:"success",message:"Stock updated and alert checked!"});

    } catch (error) {
            return res.status(500).json({status:"error",message: error.message });
    }
};

exports.getAlerts = async (req, res) => {
    try {
          const alerts = await InventoryAlert.find().populate('productId');  
          return res.status(200).json({status:"success",message:"Inventory alert fecthed succesfully!",data:{alerts}});    
    } catch (error) {
          return res.status(500).json({status:"error",message: error.message });
    }
};
