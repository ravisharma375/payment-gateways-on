const express = require("express");
const router = express.Router();
require("dotenv").config();

// WARNING: Add a Stripe Key
const stripe = require("stripe")(process.env.SECRET_KEY);
const Data = require("./cources.json");
//post register
// router.post("/register", async function(req, res) {
//   const { email, password } = req.body;

//   console.log(email, password);
//   if (password == "" || email == "") {
//     return res.json({
//       error: true,
//       message: "missing credential",
//       status: false,
//     });
//   }
//   if (password.length < 6) {
//     return res.json({
//       error: true,
//       message: "Password grater then  6 charater",
//       status: false,
//     });
//   }
//   try {
//     const findUser = await User.findOne({
//       where: {
//         email: email,
//       },
//     });
//     if (findUser) {
//       return res.json({
//         error: true,
//         message: "User Allready Exist !",
//         status: false,
//       });
//     }
//     const result = await User.create({
//       email: email,
//       password: User.hashPassword(password),
//     });

//     if (result) {
//       return res.json({
//         error: false,
//         message: "SuccessFully Register",
//         status: true,
//       });
//     }
//     return false;
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       error: true,
//       message: "Internal Server Error",
//       status: false,
//     });
//   }
// });
//post login
//passport auth
// router.post(
//   "/Login",
//   passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/Login",
//     failureFlash: true,
//   }),
//   (req, res) => {
//     const { user } = req;

//     if (user) {
//       console.log("You are logged in!");
//       sendResponse(0, user.id, res);
//       // return res.redirect('http://www.google.com')
//     }
//   },
// );
// const routes = [
//   {
//     path: "/home",
//   },
// ];
// function sendResponse(roleIndex, userId, res) {
//   return res.redirect(routes[roleIndex].path);
// }
//logout
// router.get("/Logout", function(req, res) {
//   req.logout();
//   const msg = req.flash();
//   console.log(msg.error);
//   res.render("index", {
//     loggedOut: "no",
//     title: "Login",
//     message: msg.error,
//   });
// });
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout", {
    page: "index",
    title: "Express",
    DataCourses: Data,
    publicKey: process.env.PUBLISHABLE_KEY,
  });
});
router.get("/productcart", function (req, res, next) {
  const id = req.query.ID;
  const data = Data.filter((x) => {
    if (x.Id == id) {
      return x;
    }
  });
  console.log(data);
  return res.render("layout", {
    page: "productdes",
    data,
    publicKey: process.env.PUBLISHABLE_KEY,
  });
});
var YOUR_DOMAIN = process.env.YOUR_DOMAIN;
router.get("/success", async (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId && sessionId == undefined) {
    return res.render("404");
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // const orderData = {
  //   order_id: session.id,
  //   customer_id: session.customer,
  //   payment_type: session.payment_method_types[0],
  //   payment_status: session.payment_status,
  //   amount: session.amount_total / 100 + "₹",
  // };
  // return res.json(orderData);
  res.render("success");
});
router.post("/create-session", async (req, res) => {
  const { body } = req;
  console.log(body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: body.Name,
            images: [`${YOUR_DOMAIN}/${body.Image}`],
          },
          unit_amount: body.Amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel?sessionId={CHECKOUT_SESSION_ID}`,
  });
  console.log(session);
  res.json({ id: session.id });
});
router.get("/term", (req, res) => {
  return res.render("layout", {
    page: "term",
  });
});
router.get("/upcoming", (req, res) => {
  return res.render("layout", {
    page: "upcoming",
  });
});
router.get("/cancel", async (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId && sessionId == undefined) {
    return res.render("404");
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return res.render("layout", {
    page: "cancel",
    id: session.id,
  });
});
router.get("/404", async (req, res) => {
  return res.render("404");
});

module.exports = router;
