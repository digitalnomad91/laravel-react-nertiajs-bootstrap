const use = async () => {

    const stripe = require('stripe')(

        'sk_test_51MpN7VDsX4lVK5vvPnE3YtocIHPGxWGkHyLA6ekvGCXXije208LPUcAl1NrwqhEIT5FVi82h18vTCq4dhuox9NAr00BNJ3cJ16'
        );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      });
      console.log(paymentIntent)
};
use();