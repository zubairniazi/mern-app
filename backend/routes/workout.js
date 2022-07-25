const express = require('express');

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
router.post('/', (req, res) => {
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
