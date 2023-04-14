/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, ':', err.message);
  console.log('UNCAUGHT EXCEPTION! 🧨\nShutting down...');
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🧨\nShutting down...');
  console.log(err);
  server.close(() => process.exit(1));
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, ':', err.message);
  console.log('UNHANDLED REJECTION! 🧨\nShutting down...');
  server.close(() => process.exit(1));
});
