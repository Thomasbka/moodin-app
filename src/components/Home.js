import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Modal, Button } from 'react-bootstrap';

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
  background-color: ${props => props.backgroundColor}; /* Apply the selected background color */
  color: ${props => props.textColor}; /* Apply the selected text color */
  position: relative;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const Home = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedPosts = posts.filter(post => post.id !== postToDelete);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  return (
    <HomeContainer>
      <ContentContainer>
        <Header>Past Posts</Header>
        <GridContainer>
          {posts.map(post => (
            <PostCard key={post.id} backgroundColor={post.backgroundColor} textColor={post.textColor}>
              <DeleteButton variant="danger" onClick={() => handleDeleteClick(post.id)}>
                Delete
              </DeleteButton>
              <Card.Body>
                <PostHeader>
                  <PostTitle>{post.mood}</PostTitle>
                </PostHeader>
                <Card.Text>{post.why}</Card.Text>
                <Card.Text><strong>Exercises:</strong> {post.exercises}</Card.Text>
                <Card.Link href={post.playlist} target="_blank" style={{ color: post.textColor }}>Listen to Playlist</Card.Link>
              </Card.Body>
            </PostCard>
          ))}
        </GridContainer>

        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this post?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              No
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
