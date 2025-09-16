import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VirtualClassroomDashboard from './components/VirtualClassroom/Dashboard/VirtualClassroomDashboard';
import ClassroomScene from './components/VirtualClassroom/ClassroomScene/ClassroomScene';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<VirtualClassroomDashboard />} />
          <Route path="/classroom" element={<ClassroomScene />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
