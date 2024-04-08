const {MailtrapClient} = require("mailtrap")

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = 'ProjectHub@gautamashutosh.com';

async function notifyAdmin(RECIPIENT_EMAIL, OTP) {
    const client = new MailtrapClient({ token: TOKEN });
    await client
    .send({
      from: {email: SENDER_EMAIL},
      to: [{ email: RECIPIENT_EMAIL }],
      subject: "OTP to reset password for your account",
      text: `Your OTP is: ${OTP}`,
    })
}


module.exports = notifyAdmin;