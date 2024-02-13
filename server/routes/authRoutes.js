const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/refresh").get(refreshToken);
router.route("/logout").post(logout);

module.exports = router;
