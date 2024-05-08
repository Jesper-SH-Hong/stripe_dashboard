// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.


require("dotenv").config();

const sk = process.env.STRIPE_SECRET_KEY;

console.log("sk: ", sk);


const stripe = require("stripe")(sk);
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());


app.get(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let balanceTransactions;
    let event;

    try {
      balanceTransactions = await stripe.balanceTransactions.list({});
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log(balanceTransactions);

    response.json(balanceTransactions);
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
