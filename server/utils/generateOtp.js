const OTPLENGTH = 6;

function generateOtp() {
    var otp = "";
    for(var i = 0; i < OTPLENGTH; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp
}

module.exports = generateOtp;