const stripe = Stripe('STRIPE PUBLISHABLE KEY');
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

function initializePayment() {
    return fetch('/payments', {method: 'POST'})
        .then(res => res.text())
        .then(JSON.parse);
}

async function confirmPayment(clientSecret) {
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
        },
    });
    if (result.error) {
        console.log(error);
    } else {
        alert ('Success!')
    }
}

const payButton = document.getElementById('pay-button');
payButton.addEventListener('click', async () => {
    const { clientSecret } = await initializePayment();
    confirmPayment(clientSecret);
});
