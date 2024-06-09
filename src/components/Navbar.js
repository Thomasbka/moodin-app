import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import './Navbar.css';

const Sidebar = styled(Navbar)`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  color: white;
`;

const Logo = styled.img`
  width: 100px;
  margin: 20px auto;
  display: block;
`;

function AppNavbar() {
  return (
    <Sidebar bg="dark" variant="dark" className="d-flex flex-column">
      <Logo src={logo} alt="Moodin Logo" className="logo"/>
      <Navbar.Brand as={Link} to="/">Moodin</Navbar.Brand>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/mood-tracker">Mood Tracker</Nav.Link>
        <Nav.Link as={Link} to="/journal">Journal</Nav.Link>
        <Nav.Link as={Link} to="/mindfulness">Mindfulness</Nav.Link>
        <Nav.Link as={Link} to="/mood-history">Mood History</Nav.Link>
      </Nav>
    </Sidebar>
  );
}

export default AppNavbar;
