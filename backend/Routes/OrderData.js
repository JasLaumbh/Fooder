const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    const { email, order_data, order_date } = req.body;

    // Add order date to the order data array
    order_data.unshift({ Order_date: order_date });

    try {
        let existingOrder = await Order.findOne({ email });

        if (existingOrder) {
            // Update existing order by adding new order data
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data } }
            );
            res.json({ success: true });
        } else {
            // Create a new order
            await Order.create({
                email,
                order_data: [order_data]
            });
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
