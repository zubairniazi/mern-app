require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');

// express app
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*' }));

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('URI =>', req.path, 'METHOD =>', req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port:', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to Mongo:', error.message);
  });
