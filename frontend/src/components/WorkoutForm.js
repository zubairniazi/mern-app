import React, { useState } from 'react';

const WorkoutForm = ({ handleAddWorkout }) => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm();

    let workout = { title, load, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }

    if (response.ok) {
      handleAddWorkout && handleAddWorkout(json.data);
      resetForm();
    }
  };

  const resetForm = () => {
    setError(null);
    setTitle('');
    setLoad(0);
    setReps(0);
  };

  return (
    <div className='bg-white p-5 shadow-sm rounded'>
      <h2 className='font-bold mb-4 text-lg'>Add a new workout</h2>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Exercise Title</label>
          <input
            type='text'
            className='bg-gray-50 p-2 shadow'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Load (kg)</label>
          <input
            type='number'
            className='bg-gray-50 p-2 shadow'
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Reps</label>
          <input
            type='number'
            className='bg-gray-50 p-2 shadow'
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
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
