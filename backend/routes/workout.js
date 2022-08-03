const express = require('express');
const {
  createWorkout,
  fetchWorkouts,
  fetchWorkout,
  UpdateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', fetchWorkouts);
router.get('/:id', fetchWorkout);
router.post('/', createWorkout);
router.patch('/:id', UpdateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
