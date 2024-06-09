import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
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

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo src={logo} alt="App Logo" />
      <NavItem to="/feed">
        Feed
      </NavItem>
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

    </NavbarContainer>
  );
};

export default Navbar;
