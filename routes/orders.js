const express = require('express');
const fs = require('node:fs/promises');
const router = express.Router();

router.post('/', async (req, res) => {
    const orderData = req.body.order;

    if (orderData === null || orderData.items === null || orderData.items === []) {
        return res
            .status(400)
            .json({ message: 'Missing data.' });
    }

    if (
        orderData.customer.email === null ||
        !orderData.customer.email.includes('@') ||
        orderData.customer.name === null ||
        orderData.customer.name.trim() === '' ||
        orderData.customer.street === null ||
        orderData.customer.street.trim() === '' ||
        orderData.customer['postal-code'] === null ||
        orderData.customer['postal-code'].trim() === '' ||
        orderData.customer.city === null ||
        orderData.customer.city.trim() === ''
    ) {
        return res.status(400).json({
            message:
                'Missing data: Email, name, street, postal code or city is missing.',
        });
    }

    const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
    };

    const orders = await fs.readFile('orders.json', 'utf8');
    const allOrders = orders ? JSON.parse(orders) : [];
    allOrders.push(newOrder);
    await fs.writeFile('orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order is created!' });
});

module.exports = router;