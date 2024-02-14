// Importing necessary modules and types from external libraries
import express, { Request, Response, Express } from 'express';
import { Twilio } from 'twilio';

// Creating an instance of the Express application
const app: Express = express();

// Retrieving Twilio credentials from environment variables or setting them to empty strings if not found
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';
const verifySid: string = process.env.TWILIO_VERIFY_SID || '';

// Creating a new Twilio client using the retrieved credentials
const client = new Twilio(accountSid, authToken);

// Adding middleware to parse incoming requests as JSON
app.use(express.json());

// Handling POST request to send verification code
app.post('/api/send-verification', async (req: Request, res: Response) => {
  // Extracting phone number from the request body
  const { phoneNumber }: { phoneNumber: string } = req.body;
  try {
    // Sending verification code using Twilio client
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    // Logging verification status and sending it in the response
    console.log(verification.status);
    res.status(200).send(verification.status);
  } catch (error) {
    // Handling and logging any errors that occur during the process
    console.error((error as Error).message);
    res.status(500).send((error as Error).message);
  }
});

// Handling POST request to verify the received code
app.post('/api/verify', async (req: Request, res: Response) => {
  // Extracting phone number and OTP code from the request body
  const { phoneNumber, otpCode }: { phoneNumber: string; otpCode: string } =
    req.body;
  try {
    // Verifying the received OTP code using Twilio client
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    // Logging verification check status and sending it in the response
    console.log(verification_check.status);
    res.status(200).send(verification_check.status);
  } catch (error) {
    // Handling and logging any errors that occur during the process
    console.error((error as Error).message);
    res.status(500).send((error as Error).message);
  }
});

// Exporting the configured Express application
export default app;
