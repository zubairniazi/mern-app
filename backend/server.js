require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workout');

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log('URI =>', req.path, 'METHOD =>', req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
