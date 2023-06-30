const User = require("../models/user.model");


const login = async (req, res) => {
    const {email, password} = req.body;
    try {
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password});
        res.status(201).json({user: user._id});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,
    register,
}