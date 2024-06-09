import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './components/Home';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Mindfulness from './components/Mindfulness';
import MoodHistory from './components/MoodHistory';
import Feed from './components/Feed';
import AppNavbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <AppNavbar />
        </div>
        <div className="main-content">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/mood-tracker" element={<MoodTracker />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/mindfulness" element={<Mindfulness />} />
                  <Route path="/mood-history" element={<MoodHistory />} />
                  <Route path="/feed" element={<Feed />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
