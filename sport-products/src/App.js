import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Admin from './components/admin/Admin';
import Aboutus from './components/Aboutus/Aboutus';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/admin" element={<Admin />} />

      </Routes>
    </Router>
  )
}

export default App;