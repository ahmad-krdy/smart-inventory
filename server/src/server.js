require('dotenv').config();
const connectDB = require('./config/db.config');
const express = require('express');
const cors = require('cors');

const app = express();
const inventoryRoutes = require('./routes/inventory.route');


connectDB();
app.use(express.json());
app.use(cors());

app.use('/api', inventoryRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
