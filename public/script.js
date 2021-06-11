const stripe = Stripe('pk_test_51J0jhXKJ2l69kcLh274tTYie2oMniCKhfC6YcDJFzUx6AeaqVcjjn6JKmLFGZmS3M3UnsMaD8FupjCHY2BrfVIbc00vvLWT7Jf');
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
