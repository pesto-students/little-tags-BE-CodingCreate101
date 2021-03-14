const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/orders', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_SECRET,
    });

    const options = {
      amount, // amount in smallest currency unit
      currency,
      receipt: 'receipt_order_74394',
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send('Some error occurred');

    res.json(order);
  } catch (error) {
    res.status(400);
    res.json({ error: 'error' });
  }
});

router.post('/success', async (req, res) => {
  try {
    res.json({ message: 'success' });
  } catch (error) {
    res.status(400);
    res.json({ error: 'error' });
  }
});

module.exports = router;
