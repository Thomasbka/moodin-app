import React from 'react';

function Mindfulness() {
  const exercises = [
    { name: 'Breathing Exercise', description: 'Focus on your breath...' },
    { name: 'Meditation', description: 'Sit quietly and focus...' },
    { name: 'Positive Affirmations', description: 'Repeat positive statements...' },
  ];

  return (
    <div>
      <h2>Mindfulness Exercises</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mindfulness;
