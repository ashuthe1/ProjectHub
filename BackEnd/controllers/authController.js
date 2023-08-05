const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const loginController = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "Invalid Email",
    });
  }
  const isMatch = bcrypt.compareSync(password, user.hashedPassword);
  if (!isMatch) {
    return res.status(402).send({
      success: false,
      message: "Invalid Password",
    });
  }

  if (isMatch) {
    const accessToken = generateToken(user.userName);
    res.status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        accessToken
      });
  }
};

const registerController = async (req, res) => {
  try {
    const { firstName, email, userName, password } = req.body;

    // Verifying email or userName is already registered or not
    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });
    if (existingEmail && existingUserName) {
      return res.status(409).send({
        success: false,
        message: "User with this Email and UserName is already registered",
      });
    }
    else if(existingEmail){
      return res.status(409).send({
        success: false,
        message: "User with this Email is already registered",
      });
    }
    else if(existingUserName){
      return res.status(409).send({
        success: false,
        message: "User with this UserName is already registered",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData = {
      firstName: firstName,
      email: email,
      userName: userName,
      hashedPassword: hashedPassword,
    };

    console.log(userData);
    await User.create(userData);
    res.status(200).send({
      success: true,
      message: "User account created successfully",
    });

  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message
    });
  }
};

module.exports = { loginController, registerController };