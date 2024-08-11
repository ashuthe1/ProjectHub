const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All inputs are required" });
  }

  const duplicate = await User.findOne({ email });
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User({
      ...req.body,
      password: hashedPassword,
    });

    const result = user.save();
    res.status(201).json({ success: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const generateGoogleAuthUrl = async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", 'https://projecthub.gautamashutosh.com');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectURL = 'https://projecthubbackend.gautamashutosh.com/api/v1/auth/googleOAuth';

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/business.manage'
    ];

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
      prompt: 'consent'
    });

    return res.json({ url: authorizeUrl });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  return data;
}

async function googleOAuth(req, res, next) {
  const code = req.query.code;

  try {
    const redirectURL = "https://projecthubbackend.gautamashutosh.com/api/v1/auth/googleOAuth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    
    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    const data = await getUserData(oAuth2Client.credentials.access_token);

    const email = data.email;
    const profilePic = data.picture;
    const name = email.split("@")[0];

    let foundUser = await User.findOne({ email });
    
    if (!foundUser) {
      const newUser = new User({
        name: name,
        email: email,
        profilePicture: profilePic,
        password: "Cool@123",
      });

      foundUser = await newUser.save();
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id.toString(),
          name: foundUser.name,
          email: foundUser.email,
          profilePicture: foundUser.profilePicture,
          roles: foundUser.roles,
          favorites: foundUser.favorites,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Set cookies
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    // Redirect to the frontend with the access token as a query parameter
    res.redirect(303, `https://projecthub.gautamashutosh.com?accessToken=${accessToken}`);

  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
    res.status(500).send("An error occurred during authentication");
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (foundUser.disabled) {
      return res.status(403).json({ message: "Account terminated" });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id.toString(),
          name: foundUser.name,
          email: foundUser.email,
          profilePicture: foundUser.profilePicture,
          roles: foundUser.roles,
          favorites: foundUser.favorites,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const sendOtp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const foundUser = await User.findOne({ email});
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const generatedOTP = generateOtp();
    console.log(generatedOTP);
    sendEmail(email, generatedOTP);
    foundUser.otp = generatedOTP;
    await foundUser.save();
    res.json({ message: "OTP sent successfully" });
  }
  catch (error) {
    next(error);
  }
}

const verifyOtp1 = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }
    if (foundUser.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    return res.status(200).json({ message: "OTP verified successfully" });
  }
  catch (error) {
    next(error);
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    console.log("Inside Forgot Password ", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userInitial = await User.findOne({email});
    if (!userInitial) {
      return res.status(404).json({ message: "User not found" });
    }
    if(userInitial.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userInitial.password = hashedPassword;
    userInitial.otp = null;
    await userInitial.save();
    const foundUser = await User.findOne({ email});
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id.toString(),
          name: foundUser.name,
          email: foundUser.email,
          profilePicture: foundUser.profilePicture,
          roles: foundUser.roles,
          favorites: foundUser.favorites,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  }
  catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    return res.status(403).json({ message: "Forbidden" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || foundUser._id.toString() !== decoded.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id.toString(),
            name: foundUser.name,
            email: foundUser.email,
            profilePicture: foundUser.profilePicture,
            roles: foundUser.roles,
            favorites: foundUser.favorites,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      res.json({ accessToken });
    }
  );
};

const logout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { register, generateGoogleAuthUrl, googleOAuth, login, sendOtp, verifyOtp1, forgotPassword, refreshToken, logout};
