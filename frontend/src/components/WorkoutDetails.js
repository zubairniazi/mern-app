import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({
  workout: { _id, title, reps, load, createdAt },
  workoutDeleted,
}) => {
  const handleOnDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/workouts/${_id}`,
      { method: 'DELETE' }
    );
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
        <p className='text-sm'>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>

      <div>
        <span
          className='material-symbols-outlined text-red-400 cursor-pointer'
          onClick={handleOnDelete}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
