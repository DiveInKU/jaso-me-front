import React from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home';
import Login from 'pages/login';
import SignUp from 'pages/signUp';
import CoverLetter from 'pages/coverletter/coverLetter';
import MyPage from 'pages/mypage';
// import { useNavigate } from 'react-router';
import Interview from 'pages/interview/interview';
import WebcamTest from 'pages/interview/webcamTest';
import InterviewRoom from 'pages/interview/interviewRoom';
import CoverLetterList from 'pages/coverletter/coverLetterList';
import InterviewList from 'pages/interview/interviewList';

// FC : Function Component
const App: React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/coverLetter' element={<CoverLetter/>}/>
        <Route path='/home/coverLetterList' element={<CoverLetterList/>}/>
        <Route path="/home/interview" element={<Interview />} />
        <Route path="/home/interviewList" element={<InterviewList />} />
        <Route path="/home/mypage" element={<MyPage />}/>
        <Route path="/home/interview/webcamtest" element={<WebcamTest />} />
        <Route path="/home/interview/webcamtest/interviewroom" element={<InterviewRoom />} />
      </Routes>
  )
}

export default App;
