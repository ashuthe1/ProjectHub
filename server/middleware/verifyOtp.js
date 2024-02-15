const {sendEmail, generateOtp} = require("../utils/sendEmail");
const User = require("../models/userModel");

const verifyOtp = async(req, res, next) => {
    const { email, otp } = req.body;
    
    if(!email) return res.status(400).json({ message: "Email is required" });
    if(!otp) return res.status(400).json({ message: "OTP is required" });

    const user = await User.findOne({ email});
    if (!user) return res.status(404).json({ message: "User not found" });

    if (otp !== user.otp) return res.status(401).json({ message: "Invalid OTP" });
    next();
}

module.exports = verifyOtp;