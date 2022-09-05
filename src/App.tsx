import React from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import SignUp from 'pages/signUp';
import Interview from 'pages/interview';
import WebcamTest from 'pages/webcamTest';

// FC : Function Component
const App: React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path="/home/interview" element={<Interview />} />
        <Route path="/home/interview/webcamtest" element={<WebcamTest />} />
      </Routes>
  )
}

export default App;
