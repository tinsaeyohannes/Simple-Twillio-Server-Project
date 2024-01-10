require('dotenv').config();
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
console.log(process.env.TWILIO_ACCOUNT_SID);
const startServer = () => {
  server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
};

startServer();
