# Blog App

A simple server to send otp-codes to a phone-number

## Installation

1. Clone the repository:

   git clone <https://github.com/tinsaedv/Simple-Twillio-Server-Project.git>

2. Install the dependencies for the server:

- Server

  ```
  npm install && tsc && npm run start
  ```

3. Set up the environment variables:

- Create a .env file in the root directory.
- Add the following variables:

  - TWILIO_AUTH_TOKEN=your-twilio-auth-token
  - TWILIO_ACCOUNT_SID=your-twilio-account-sid
  - TWILIO_VERIFY_SID=your-twilio-verify-sid

## Usage

- Enter the phone number you want to send the OTP to.
- Enter the OTP code that was sent to the phone number you entered to verify.

## Technologies Used

- Twilio: Twilio API for sending SMS.
- Express.js: Web application framework for the backend.
- Node.js: JavaScript runtime environment for the server.

## Features

- Sending OTP codes to a phone number.
- Verifying OTP codes.

## API Documentation

- To send OTP code add phone number to request body at <http://localhost:3000/api/send-verification>

- To verify OTP code add phone number to request body at <http://localhost:3000/api/verify>

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Twilio API
- Express.js
- Node.js
