const express = require('express');
const stripe = require('stripe')('STRIPE SECRET KEY');

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