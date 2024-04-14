import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App;