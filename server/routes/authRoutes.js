const express = require("express");
const router = express.Router();
const {
  register,
  login,
  sendOtp,
  forgotPassword,
  refreshToken,
  logout,
} = require("../controllers/authController");
const verifyOtp = require("../middleware/verifyOtp");
const rateLimiter = require("../middleware/rateLimiter");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/sendOtp").post(sendOtp);
router.route("/forgotPassword").post(verifyOtp, forgotPassword);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(logout);

module.exports = router;
