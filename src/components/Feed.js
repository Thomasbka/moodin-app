import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  return (
    <FeedContainer>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </FeedContainer>
  );
};

export default Feed;
