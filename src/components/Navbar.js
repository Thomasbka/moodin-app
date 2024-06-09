import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Adjust the path as needed

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #343a40;
  color: white;
  height: 100%;
  width: 250px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 10px 0;
  font-size: 1.2em;

  &.active {
    font-weight: bold;
    color: #007bff;
  }

  &:hover {
    color: #007bff;
  }
`;

const CreatePostButton = styled(Button)`
  margin-top: 20px;
`;

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    mood: '',
    why: '',
    exercises: '',
    playlist: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedPosts = localStorage.getItem('posts');
    const posts = savedPosts ? JSON.parse(savedPosts) : [];
    const newPost = {
      id: posts.length + 1,
      ...formData
    };
    const updatedPosts = [...posts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setFormData({
      mood: '',
      why: '',
      exercises: '',
      playlist: ''
    });
    setShowModal(false);
  };

  return (
    <NavbarContainer>
      <h2>Moodi</h2>
      <Logo src={logo} alt="App Logo" />
      <NavItem to="/" exact>
        Home
      </NavItem>
      <NavItem to="/mood-tracker">
        Mood Tracker
      </NavItem>
      <NavItem to="/journal">
        Journal
      </NavItem>
      <NavItem to="/mindfulness">
        Mindfulness
      </NavItem>
      <NavItem to="/mood-history">
        Mood History
      </NavItem>
      <NavItem to="/feed">
        Feed
      </NavItem>
      <CreatePostButton variant="primary" onClick={() => setShowModal(true)}>
        Create Post
      </CreatePostButton>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </NavbarContainer>
  );
};

export default Navbar;
