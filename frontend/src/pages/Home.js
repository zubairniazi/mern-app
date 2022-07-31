import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  const handleAddWorkout = (workout) => {
    setWorkouts([{ ...workout }, ...workouts]);
  };

  const handleWorkoutDeleted = (id) => {
    setWorkouts(workouts.filter((w) => w._id !== id));
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/workouts`
      );
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json.data);
      }
    };

    fetchWorkouts();

    return () => {};
  }, []);

  return (
    <div className='flex flex-col space-y-6 md:flex-row md:space-x-12 md:space-y-0'>
      <div className='flex flex-col space-y-6 flex-1'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              workoutDeleted={handleWorkoutDeleted}
            />
          ))}
      </div>
      <div className='md:w-1/3'>
        <WorkoutForm handleAddWorkout={handleAddWorkout} />
      </div>
    </div>
  );
};

export default Home;
