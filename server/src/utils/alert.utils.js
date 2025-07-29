const InventoryAlert = require('../models/inventory_alert.model');
const StockMovement = require('../models/stock_movement.model');

const generateAlerts = async (product) => {
        const now = new Date();
        const daysRestockSince = Math.floor((now - product.lastRestockedDaysAgo) / (1000 * 60 * 60 * 24));

        let level = null;
        let message = '';

        /* For critical */
        if (product.stock < product.threshold * 0.3) {
                  level = 'critical';
                  message = 'Stock is below 30% of minimum threshold';
        } else if (product.stock < product.threshold) {
            /* For high*/
            if (product.stock >= product.threshold * 0.3) {
                  level = 'high';
                  message = 'Stock is below minimum threshold';
            }
            /* For medium*/
            if (daysRestockSince > product.supplierLeadTime) {
                  level = 'medium';
                  message = 'Stock is below threshold and supplier lead time passed';
            }
        }

        /* For low*/
        const lastMovement = await StockMovement.findOne({ productId: product._id }).sort({ timestamp: -1 });
        if (lastMovement) {
              const daysMovementSince = Math.floor((now - lastMovement.timestamp) / (1000 * 60 * 60 * 24));
              if (daysMovementSince > 30 && product.stock > product.threshold * 2) {
                  level = 'low';
                  message = 'No stock movement for 30+ days but stock is over double the threshold';
              }
        }

        if (level) {
            const alert = new InventoryAlert({
                productId: product._id,
                level,
                message,
            });
            await alert.save();
        }
};
module.exports = generateAlerts;
