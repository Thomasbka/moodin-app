import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomMoodForm from './CustomMoodForm';
import { Button, Container } from 'react-bootstrap';

const MoodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

const MoodButton = styled(Button)`
  background-color: ${props => props.color};
  color: white;
  font-size: 1em;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const moods = [
  { name: 'Happy', color: 'yellow' },
  { name: 'Sad', color: 'blue' },
  { name: 'Anxious', color: 'orange' },
  { name: 'Calm', color: 'green' },
  { name: 'Excited', color: 'red' },
  { name: 'Bored', color: 'gray' },
  // Add more moods as needed
];

function MoodTracker() {
  const [customMoods, setCustomMoods] = useState(() => {
    const savedCustomMoods = localStorage.getItem('customMoods');
    return savedCustomMoods ? JSON.parse(savedCustomMoods) : [];
  });

  useEffect(() => {
    localStorage.setItem('customMoods', JSON.stringify(customMoods));
  }, [customMoods]);

  const handleMoodChange = (selectedMood) => {
    localStorage.setItem('currentMood', JSON.stringify(selectedMood));
  };

  const handleCustomMoodCreate = (newMood) => {
    const updatedCustomMoods = [...customMoods, { ...newMood, custom: true }];
    setCustomMoods(updatedCustomMoods);
  };

  return (
    <Container>
      <MoodContainer>
        {moods.map((mood, index) => (
          <MoodButton
            key={index}
            color={mood.color}
            onClick={() => handleMoodChange(mood)}
          >
            {mood.name}
          </MoodButton>
        ))}
        {customMoods.map((mood, index) => (
          <MoodButton
            key={index}
            color={mood.color}
            onClick={() => handleMoodChange(mood)}
          >
            {mood.name}
          </MoodButton>
        ))}
      </MoodContainer>
      <CustomMoodForm onMoodCreate={handleCustomMoodCreate} />
    </Container>
  );
}

export default MoodTracker;
