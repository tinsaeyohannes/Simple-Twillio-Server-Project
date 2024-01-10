const express = require('express');
const app = express();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);

app.use(express.json());

app.post(
  '/api/send-verification',
  (sendVerification = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const verification = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });
      console.log(verification.status);
      res.status(200).send(verification.status);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  })
);

app.post(
  '/api/verify',
  (sendVerification = async (req, res) => {
    const { phoneNumber, otpCode } = req.body;
    try {
      const verification_check = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otpCode });

      console.log(verification_check.status);
      res.status(200).send(verification_check.status);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  })
);

module.exports = app;
