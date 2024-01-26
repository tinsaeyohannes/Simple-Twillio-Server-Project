import express, { Request, Response, Express } from 'express';
import { Twilio } from 'twilio';

const app: Express = express();
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';
const verifySid: string = process.env.TWILIO_VERIFY_SID || '';
const client = new Twilio(accountSid, authToken);

app.use(express.json());

app.post('/api/send-verification', async (req: Request, res: Response) => {
  const { phoneNumber }: { phoneNumber: string } = req.body;
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    console.log(verification.status);
    res.status(200).send(verification.status);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send((error as Error).message);
  }
});

app.post('/api/verify', async (req: Request, res: Response) => {
  const { phoneNumber, otpCode }: { phoneNumber: string; otpCode: string } =
    req.body;
  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    console.log(verification_check.status);
    res.status(200).send(verification_check.status);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send((error as Error).message);
  }
});

export default app;
