import React from 'react';

const WorkoutDetails = ({ workout: { title, reps, load, createdAt } }) => {
  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <h3 className='text-lg font-bold text-indigo-500'>{title}</h3>
      <p className='text-sm'>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p className='text-sm'>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p className='text-sm'>{createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
