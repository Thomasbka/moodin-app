import React, { useEffect, useState } from 'react';

function MoodHistory() {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory'));
    if (storedMoodHistory) {
      setMoodHistory(storedMoodHistory);
    }
  }, []);

  return (
    <div>
      <h2>Mood History</h2>
      <ul>
        {moodHistory.map((log, index) => (
          <li key={index}>{log.date}: {log.mood}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoodHistory;
