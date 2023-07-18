const express = require("express");
const app = express();
const { resolve } = require("path");
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require("stripe")("Enter your own secret key");
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items[0].amount)
  return items[0].amount;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const { currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});
app.get("/greet", async (req, res) => {
    res.send('hello,It is working!');
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Node server listening on port ${PORT}'));