const express = require('express');
const Workout = require('../models/workoutModel');

const router = express.Router();

// Fetch All
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all workouts' });
});

// Fetch Single
router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'Get a single workout' });
});

// Create
router.post('/', async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });

    res
      .status(200)
      .json({ message: 'Workout created successfully.', data: workout });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating workout: ' + error.message });
  }

  res.status(200).json({ message: 'Create a workout' });
});

// Update
router.patch('/:id', (req, res) => {
  res.status(200).json({ message: 'Update a workout' });
});

// Delete
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete a workout' });
});

module.exports = router;
