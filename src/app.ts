import express, { Request, Response } from 'express';
import { Twilio } from 'twilio';

const app = express();
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';
const verifySid: string = process.env.TWILIO_VERIFY_SID || '';
const client = new Twilio(accountSid, authToken);

app.use(express.json());

app.post('/api/send-verification', async (req: Request, res: Response) => {
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
});

app.post('/api/verify', async (req: Request, res: Response) => {
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
});

export default app;
