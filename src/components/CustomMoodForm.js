import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const FormContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

function CustomMoodForm({ onMoodCreate }) {
  const [moodName, setMoodName] = useState('');
  const [moodColor, setMoodColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (moodName) {
      onMoodCreate({ name: moodName, color: moodColor });
      setMoodName('');
      setMoodColor('#ffffff');
    }
  };

  return (
    <FormContainer>
      <h2>Create a Custom Mood</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Mood Name"
            value={moodName}
            onChange={(e) => setMoodName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="color"
            value={moodColor}
            onChange={(e) => setMoodColor(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Mood
        </Button>
      </Form>
    </FormContainer>
  );
}

export default CustomMoodForm;
