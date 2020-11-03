const express = require("express");
const router = express.Router();
require("dotenv").config();
const { Products, config, User } = require("../config/database");
var passport = require("passport");
var auth = require("../config/auth");
const { Op } = require("sequelize");
// UUID to generate unique key
const { v4: uuid } = require("uuid");

// WARNING: Add a Stripe Key
const stripe = require("stripe")(config.get("SECRET_KEY"));

//post register
router.post("/register", async function(req, res) {
  const { email, password } = req.body;

  console.log(email, password);
  if (password == "" || email == "") {
    return res.json({
      error: true,
      message: "missing credential",
      status: false,
    });
  }
  if (password.length < 6) {
    return res.json({
      error: true,
      message: "Password grater then  6 charater",
      status: false,
    });
  }
  try {
    const findUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (findUser) {
      return res.json({
        error: true,
        message: "User Allready Exist !",
        status: false,
      });
    }
    const result = await User.create({
      email: email,
      password: User.hashPassword(password),
    });

    if (result) {
      return res.json({
        error: false,
        message: "SuccessFully Register",
        status: true,
      });
    }
    return false;
  } catch (error) {
    console.log(error)
    return res.json({
      error: true,
      message: "Internal Server Error",
      status: false,
    });
  }
});
//post login
//passport auth
router.post(
  "/Login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/Login",
    failureFlash: true,
  }),
  (req, res) => {
    const { user } = req;

    if (user) {
      console.log("You are logged in!");
      sendResponse(0, user.id, res);
      // return res.redirect('http://www.google.com')
    }
  },
);
const routes = [
  {
    path: "/home",
  },
];
function sendResponse(roleIndex, userId, res) {
  return res.redirect(routes[roleIndex].path);
}
//logout
router.get("/Logout", function(req, res) {
  req.logout();
  const msg = req.flash();
  console.log(msg.error);
  res.render("index", {
    loggedOut: "no",
    title: "Login",
    message: msg.error,
  });
});
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express", PublicKey: config.get("PUBLISHABLE_KEY") });
});
module.exports = router;
