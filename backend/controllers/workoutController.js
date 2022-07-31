const mongoose = require('mongoose');

const Workout = require('../models/workoutModel');

const fetchWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: 'Workouts fetched successfully.', data: workouts });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error fetching workouts: ' + error.message });
  }
};

const fetchWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ message: 'No such workout' });

  try {
    const workout = await Workout.findById(id);

    if (!workout) res.status(404).json({ message: 'No such workout' });

    res
      .status(200)
      .json({ message: 'Workout fetched successfully.', data: workout });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error fetching workout: ' + error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let errors = {};

  if (!title) errors.title = 'Title Field is required';

  if (!reps) errors.reps = 'Reps Field is required';

  if (!load) errors.load = 'Load Field is required';

  if (Object.keys(errors).length)
    return res
      .status(400)
      .json({ message: 'Please fill all the required fields.', errors });

  try {
    const workout = await Workout.create({ title, reps, load });

    res
      .status(200)
      .json({ message: 'Workout created successfully.', data: workout });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const UpdateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ message: 'No such workout' });

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) res.status(404).json({ message: 'No such workout' });

    res
      .status(200)
      .json({ message: 'Workout updated successfully.', data: workout });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating workout: ' + error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ message: 'No such workout' });

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) res.status(404).json({ message: 'No such workout' });

    res
      .status(200)
      .json({ message: 'Workout deleted successfully.', data: workout });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error deleting workout: ' + error.message });
  }
};

module.exports = {
  fetchWorkouts,
  fetchWorkout,
  createWorkout,
  UpdateWorkout,
  deleteWorkout,
};
