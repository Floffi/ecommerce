const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const routes = require('./routes');

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB connection successful!');
  } catch (error) {
    console.error(error);
  }
};

const initializeMiddlewares = (app) => {
  // Enable All CORS Requests.
  app.use(cors());
  // Parses incoming requests with JSON payloads.
  app.use(express.json());
  // Parses incoming requests with urlencoded payloads.
  app.use(express.urlencoded({ extended: true }));
  // Secure app by setting various HTTP headers.
  app.use(helmet());
};

const initializeExpress = () => {
  // Loads environment variables from a .env file into process.env.
  require('dotenv').config();
  const app = express();
  // Initialize database.
  initializeDatabase();
  // Initialize all middlewares.
  initializeMiddlewares(app);
  // Load Rest API routes.
  app.use('/api', routes);
  // Error handler.
  app.use((err, _req, res, _next) => {
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({
      status: 'failure',
      message,
    });
  });
  // Start app on given port.
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}!`)
  );
};

initializeExpress();
