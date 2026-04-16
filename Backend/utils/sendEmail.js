const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const msg = {
      to,
      from: `"Sivion EnterpriseTech Hub" <${process.env.EMAIL_FROM}>`, // verified sender
      subject,
      text,
      html,
    };

    await sgMail.send(msg);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.response?.body || error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;