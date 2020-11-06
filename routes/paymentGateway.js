// const express = require("express");
// const router = express.Router();
// require("dotenv").config();
// const { config } = require("../config/database");
// var passport = require("passport");
// var auth = require("../config/auth");
// const { Op } = require("sequelize");
// // UUID to generate unique key
// const { v4: uuid } = require("uuid");

// // WARNING: Add a Stripe Key
// const stripe = require("stripe")(config.get("SECRET_KEY"));

// router.post("/payment", async (req, res) => {
//   console.log(req.body);
//   const { product, token } = req.body;
//   const idempontencyKey = uuid();
//   return await stripe.customers
//     .create({
//       email: "xyz@gmail.com",
//       source: token,
//     })
//     .then(customer => {
//       stripe.charges.create(
//         {
//           amount: 10 * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: "xyz@gmail.com",
//           description: "xyz@gmail.com",
//           shipping: {
//             name: "xyz@gmail.com",
//             address: {
//               country: "xyz@gmail.com",
//             },
//           },
//         },
//         { idempontencyKey },
//       );
//     })
//     .then(result => {
//       return res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
// var YOUR_DOMAIN = "http://localhost:4540";
// // Fetch the Checkout Session to display the JSON result on the success page
// router.get("/checkout-session", async (req, res, next) => {
//   const { sessionId } = req.query;
//   const session = await stripe.checkout.sessions.retrieve(sessionId);
//   res.send(session);
// });
// router.post("/create-session", async (req, res) => {
//   const { body } = req;
//   console.log(body);
//   // const data = {
//   //   productName: body.product_name,
//   //   amount: body.amount,
//   //   quantity: body.quantity_number,
//   // };
//   const session = await stripe.checkout.sessions.create({
//     submit_type: "pay",
//     billing_address_collection: "auto",
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: "Stubborn Attachments",
//             images: ["https://i.imgur.com/EHyR2nP.png"],
//           },
//           unit_amount: 2000 * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success?sessionId={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${YOUR_DOMAIN}/cancel`,
//   });
//   console.log(session);
//   res.json({ id: session.id });
// });

// // Webhook handler for asynchronous events.
// router.post("/webhook", async (req, res) => {
//   let data;
//   let eventType;
//   // Check if webhook signing is configured.
//   if (process.env.STRIPE_WEBHOOK_SECRET) {
//     // Retrieve the event by verifying the signature using the raw body and secret.
//     let event;
//     let signature = req.headers["stripe-signature"];

//     try {
//       event = stripe.webhooks.constructEvent(req.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`);
//       return res.sendStatus(400);
//     }
//     // Extract the object from the event.
//     data = event.data;
//     eventType = event.type;
//   } else {
//     // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//     // retrieve the event data directly from the request body.
//     data = req.body.data;
//     eventType = req.body.type;
//   }

//   if (eventType === "checkout.session.completed") {
//     console.log(`🔔  Payment received!`);
//   }

//   res.sendStatus(200);
// });
// router.get("/success", async (req, res) => {
//   const { sessionId } = req.query;
//   const session = await stripe.checkout.sessions.retrieve(sessionId);
//   const orderData = {
//     order_id: session.id,
//     customer_id: session.customer,
//     payment_type: session.payment_method_types[0],
//     payment_status: session.payment_status,
//     amount: session.amount_total / 100 + "₹",
//   };
//   return res.json(orderData);
//   res.render("success");
// });

// module.exports = router;
