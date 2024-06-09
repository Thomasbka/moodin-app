import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Header = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const HomeContainer = styled.div`
  background-color: ${props => props.backgroundColor || 'white'};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  overflow-y: auto; /* Enable vertical scrolling if needed */
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const FormContainer = styled(Card)`
  padding: 20px;
  margin-bottom: 20px;
`;

const Home = () => {
  const [currentMood, setCurrentMood] = useState({});
  const [journalEntries, setJournalEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [formData, setFormData] = useState({
    mood: '',
    why: '',
    exercises: '',
    playlist: ''
  });

  useEffect(() => {
    try {
      const mood = JSON.parse(localStorage.getItem('currentMood')) || { name: 'Happy', color: 'yellow' };
      setCurrentMood(mood);
    } catch (e) {
      setCurrentMood({ name: 'Happy', color: 'yellow' });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      ...formData
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setFormData({
      mood: '',
      why: '',
      exercises: '',
      playlist: ''
    });
  };

  return (
    <HomeContainer backgroundColor={currentMood.color}>
      <ContentContainer>
        <Header>
          <h1>Welcome Back!</h1>
          <p>Your current mood is: <strong>{currentMood.name}</strong></p>
        </Header>
        
        <FormContainer>
          <h2>Create a Post</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMood">
              <Form.Label>Mood</Form.Label>
              <Form.Control
                type="text"
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
                placeholder="Enter your mood"
                required
              />
            </Form.Group>
            <Form.Group controlId="formWhy">
              <Form.Label>Why</Form.Label>
              <Form.Control
                type="text"
                name="why"
                value={formData.why}
                onChange={handleInputChange}
                placeholder="Why do you feel this way?"
                required
              />
            </Form.Group>
            <Form.Group controlId="formExercises">
              <Form.Label>Exercises</Form.Label>
              <Form.Control
                type="text"
                name="exercises"
                value={formData.exercises}
                onChange={handleInputChange}
                placeholder="Enter exercises you recommend"
              />
            </Form.Group>
            <Form.Group controlId="formPlaylist">
              <Form.Label>Playlist</Form.Label>
              <Form.Control
                type="text"
                name="playlist"
                value={formData.playlist}
                onChange={handleInputChange}
                placeholder="Enter playlist URL"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </FormContainer>

        <Section>
          <Card>
            <Card.Header>
              <h2>Journal Entries</h2>
            </Card.Header>
            <Card.Body>
              <ul>
                {journalEntries.map((log, index) => (
                  <li key={index}>
                    <p>{log.date}: {log.entry}</p>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Section>

        <Section>
          <Card>
            <Card.Header>
              <h2>Mindfulness Exercises</h2>
            </Card.Header>
            <Card.Body>
              <p>Mindfulness exercises go here...</p>
            </Card.Body>
          </Card>
        </Section>

        <Section>
          <Card>
            <Card.Header>
              <h2>Mood History</h2>
            </Card.Header>
            <Card.Body>
              <p>Mood history goes here...</p>
            </Card.Body>
          </Card>
        </Section>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
