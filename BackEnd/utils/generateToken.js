const jwt = require("jsonwebtoken");
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN || 'OURHARDCODEDSECRET';

const generateToken = (userName) =>{
    const accessToken = jwt.sign({ userName }, SECRET_ACCESS_TOKEN);
    return accessToken;
};

module.exports = { generateToken };