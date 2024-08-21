const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select(["-password", "-refreshToken", "-favorites", "-otp"]) // Excluding the otp field
      .sort({ "followersData.count": -1 }); // Sorting by followersData.count in descending order
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


// follow a user by his ID
const followUser = async (req, res, next) => {
  try {
    console.log("Inside Follow user function");
    console.log(req.params.id, req.user);
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({
      success: false,
      message: "User not found"
    });
    if (!user.followersData.users.includes(req.user)) {

      user.followersData.users.push(req.user);
      user.followersData.count++;
      await user.save();

      console.log("Scuccessfully followed")

      res.status(200).json({
        success: true,
        message: "user has been followed"
      });
    } else {
      console.log("You allready follow this user")
      res.status(403).json({
        success: false,
        message: "you allready follow this user"
      });
    }
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        profilePicture: image ? image : null,
        password: hashedPassword,
      },
      { new: true }
    );

    const roles = Object.values(user.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          roles: roles,
          favorites: user.favorites,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const disableUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isDisabled: true }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, followUser, updateUser, disableUser };
