import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import { ChromePicker } from 'react-color'; // Import the color picker component
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  @media (max-width: 768px) {
    transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
  }
`;

const AppName = styled.h1`
  color: white;
  font-size: 1.5em;
  margin-bottom: 10px;
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

const ToggleButton = styled(Button)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2000;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    mood: '',
    why: '',
    exercises: '',
    playlist: '',
    backgroundColor: '#ffffff', // Default background color
    textColor: '#000000' // Default text color
  });

  const navbarRef = useRef();
  const toggleButtonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarRef, toggleButtonRef]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBackgroundColorChange = (color) => {
    setFormData({
      ...formData,
      backgroundColor: color.hex
    });
  };

  const handleTextColorChange = (color) => {
    setFormData({
      ...formData,
      textColor: color.hex
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
      playlist: '',
      backgroundColor: '#ffffff', // Reset to default background color
      textColor: '#000000' // Reset to default text color
    });
    setShowModal(false);
  };

  return (
    <>
      <ToggleButton ref={toggleButtonRef} variant="primary" onClick={() => setNavbarOpen(!navbarOpen)}>
        ☰
      </ToggleButton>
      <NavbarContainer ref={navbarRef} open={navbarOpen}>
        <AppName>Moodi</AppName>
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
              <Form.Group controlId="formBackgroundColor">
                <Form.Label>Pick a Background Color for Your Mood</Form.Label>
                <ChromePicker
                  color={formData.backgroundColor}
                  onChangeComplete={handleBackgroundColorChange}
                />
              </Form.Group>
              <Form.Group controlId="formTextColor">
                <Form.Label>Pick a Text Color for Your Mood</Form.Label>
                <ChromePicker
                  color={formData.textColor}
                  onChangeComplete={handleTextColorChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Create Post
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
