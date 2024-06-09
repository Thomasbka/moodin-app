import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card } from 'react-bootstrap';
import './Home.css';

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
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
`;

function Home() {
  const [currentMood, setCurrentMood] = useState({});

  useEffect(() => {
    try {
      const mood = JSON.parse(localStorage.getItem('currentMood')) || { name: 'Happy', color: 'yellow' };
      setCurrentMood(mood);
    } catch (e) {
      setCurrentMood({ name: 'Happy', color: 'yellow' });
    }
  }, []);

  const [journalEntries, setJournalEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  return (
    <HomeContainer backgroundColor={currentMood.color}>
      <ContentContainer>
        <Header>
          <h1>Welcome Back!</h1>
          <p>Your current mood is: <strong>{currentMood.name}</strong></p>
        </Header>
        
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
}

export default Home;
