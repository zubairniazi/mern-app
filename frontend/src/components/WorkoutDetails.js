import React from 'react';

const WorkoutDetails = ({
  workout: { _id, title, reps, load, createdAt },
  workoutDeleted,
}) => {
  const handleOnDelete = async () => {
    const response = await fetch(`/api/workouts/${_id}`, { method: 'DELETE' });
    // const json = response.json();

    if (response.ok) {
      workoutDeleted && workoutDeleted(_id);
    }
  };

  return (
    <div className='bg-white p-4 shadow-sm rounded flex'>
      <div className='flex-1'>
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
      <span
        className='text-red-400 text-sm cursor-pointer'
        onClick={handleOnDelete}
      >
        x
      </span>
    </div>
  );
};

export default WorkoutDetails;
