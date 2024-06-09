import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './components/Home';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Mindfulness from './components/Mindfulness';
import MoodHistory from './components/MoodHistory';
import AppNavbar from './components/Navbar';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
          <AppNavbar />
        </div>
        <Container fluid>
          <Row>
            <Col xs={12} md={3} className="d-none d-md-block sidebar">
              <AppNavbar />
            </Col>
            <Col xs={12} md={9} className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mood-tracker" element={<MoodTracker />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/mindfulness" element={<Mindfulness />} />
                <Route path="/mood-history" element={<MoodHistory />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
