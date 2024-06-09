import React from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Mood = styled.h2`
  color: ${props => props.color};
`;

const Why = styled.p`
  font-size: 1.1em;
  margin: 10px 0;
`;

const Exercises = styled.p`
  font-size: 1em;
  margin: 10px 0;
  font-weight: bold;
`;

const Playlist = styled.a`
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const moodColors = {
  Happy: 'yellow',
  Sad: 'blue',
  Anxious: 'orange',
  Calm: 'green',
  Excited: 'red',
  Bored: 'gray',
  Weird: 'brown'
};

function Post({ post }) {
  return (
    <PostContainer>
      <Mood color={moodColors[post.mood]}>{post.mood}</Mood>
      <Why>{post.why}</Why>
      <Exercises>Exercises: {post.exercises}</Exercises>
      <Playlist href={post.playlist} target="_blank">Listen to Playlist</Playlist>
    </PostContainer>
  );
}

export default Post;
