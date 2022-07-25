require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('URI =>', req.path, 'METHOD =>', req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

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
