document.addEventListener('DOMContentLoaded', function() {
  // Initialize Stripe Elements
  const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
  const elements = stripe.elements();
  const cardNumber = elements.create('cardNumber');
  const cardExpiry = elements.create('cardExpiry');
  const cardCvc = elements.create('cardCvc');
  
  cardNumber.mount('#card-number');
  cardExpiry.mount('#card-expiry');
  cardCvc.mount('#card-cvc');

  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('active');
      });
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Amount display update
  const amountInput = document.getElementById('amount');
  const amountDisplay = document.getElementById('amount-display');
  amountInput.addEventListener('input', () => {
    amountDisplay.textContent = amountInput.value;
  });

  // PayPal integration
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amountInput.value
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Payment completed by ' + details.payer.name.given_name);
        // You would typically send this to your server for verification
        fetch('/api/payments/verify-paypal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: data.orderID,
            amount: amountInput.value
          })
        });
      });
    },
    onError: function(err) {
      console.error('PayPal error:', err);
      alert('There was an error processing your PayPal payment');
    }
  }).render('#paypal-button-container');

  // Crypto payment address generation
  document.getElementById('generate-address').addEventListener('click', async () => {
    const