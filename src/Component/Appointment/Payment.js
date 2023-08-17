import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('Payment error:', error);
    } else {
      console.log('Payment successful:', paymentMethod);
    }
  };

  return (
    <div>
      <h1>Stripe Payment</h1>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
