const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_KEY);

const stripeAddress = {
    line1: "Hennur Main Road, Kalyan Nagar",
    line2: "Kalyan Nagar, HBR Layout 4th Block",
    city: "Bengaluru",
    country: "India",
    postal_code: "560043",
    state: "Karnataka",
};


const subscribe = async (req, res, next) => {
  try {
    console.log("Inside subscribe")

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user,
      }
    });

    console.log("Customer created")

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: "payment",
      currency: 'INR',
      success_url: `${process.env.CLIENT_BASE_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/payment-failed`,
    });

    console.log("Session created")

    const foundUser = await User.findByIdAndUpdate(
      req.user,
      {
        roles: ["BasicUser", "ProUser"]
      },
      { new: true }
    );
    if (!foundUser) {
      return res.sendStatus(401);
    }

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          profilePicture: foundUser.profilePicture,
          roles: roles,
          favorites: foundUser.favorites,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({ url: session.url, accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { subscribe };
