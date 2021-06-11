const express = require('express');
const stripe = require('stripe')('sk_test_51J0jhXKJ2l69kcLh0fHtjVuvAzK8wHsl3HLuDEsosbFO72dfHUqGxKDYLuEUmRhgrvH3TffRGd18zs4XGQDV194p00zb0nDbuz');

const app = express();
app.use(express.static('public'));
app.post('/payments', async (req, res) => {
    const { client_secret } = await stripe.paymentIntents.create({
        amount: 10000,
        currency: 'eur',
        payment_method_types: ['card'],
    });
    console.log(client_secret);
    res.send(JSON.stringify({ clientSecret: client_secret }));
});

app.listen(8080, () => console.log('Application is running...'));