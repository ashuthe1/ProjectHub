const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN || 'OURHARDCODEDSECRET';
const loginController = async (req, res) => {
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
    const accessToken = jwt.sign({ id: user._id, email: user.email, userName: user.userName }, SECRET_ACCESS_TOKEN);
    res.status(200)
      .json({
        accessToken
      });
  }
};


const registerController = async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;

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
      name: name,
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