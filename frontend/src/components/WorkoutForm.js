import React, { useState } from 'react';

const WorkoutForm = ({ handleAddWorkout }) => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let workout = { title, load, reps };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/workouts`,
      {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setErrors(json.errors);
    }

    if (response.ok) {
      handleAddWorkout && handleAddWorkout(json.data);
      resetForm();
    }
  };

  const resetForm = () => {
    setErrors(null);
    setError(null);
    setTitle('');
    setLoad('');
    setReps('');
  };

  return (
    <div className='bg-white p-5 shadow-sm rounded'>
      <h2 className='font-bold mb-4 text-lg'>Add a new workout</h2>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Exercise Title</label>
          <input
            type='text'
            className={`bg-gray-50 p-2 shadow ${
              errors && errors.title ? 'border border-red-400 rounded' : ''
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className='text-sm text-red-400 mt-1'>
            {errors && errors.title}
          </span>
        </div>

        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Load (kg)</label>
          <input
            type='number'
            className={`bg-gray-50 p-2 shadow ${
              errors && errors.title ? 'border border-red-400 rounded' : ''
            }`}
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
          <span className='text-sm text-red-400 mt-1'>
            {errors && errors.load}
          </span>
        </div>

        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Reps</label>
          <input
            type='number'
            className={`bg-gray-50 p-2 shadow ${
              errors && errors.title ? 'border border-red-400 rounded' : ''
            }`}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
          <span className='text-sm text-red-400 mt-1'>
            {errors && errors.reps}
          </span>
        </div>

        <div className='flex flex-col'>
          <input
            type='submit'
            value='Add workout'
            className='text-sm bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded cursor-pointer'
          />
        </div>

        {error && (
          <div className='text-red-400 bg-red-50 p-2 border border-red-400'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkoutForm;
