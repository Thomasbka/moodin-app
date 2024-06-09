import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const HomeContainer = styled.div`
  background-color: ${props => props.backgroundColor || 'white'};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const PostCard = styled(Card)`
  width: 100%;
`;

const MoodIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin-right: 10px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Home = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const moodColors = {
    Happy: 'yellow',
    Sad: 'blue',
    Anxious: 'orange',
    Calm: 'green',
    Excited: 'red',
    Bored: 'gray',
    Weird: 'brown'
  };

  return (
    <HomeContainer>
      <ContentContainer>
        <Header>User</Header>
        <GridContainer>
          {posts.map(post => (
            <PostCard key={post.id}>
              <Card.Body>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MoodIcon color={moodColors[post.mood]}>{post.mood.charAt(0)}</MoodIcon>
                  <div>
                    <Card.Title>{post.mood}</Card.Title>
                    <Card.Text>{post.why}</Card.Text>
                    <Card.Text><strong>Exercises:</strong> {post.exercises}</Card.Text>
                    <Card.Link href={post.playlist} target="_blank">Listen to Playlist</Card.Link>
                  </div>
                </div>
              </Card.Body>
            </PostCard>
          ))}
        </GridContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
