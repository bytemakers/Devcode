import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Projects/Projects';
import Register from './components/Register/Register';
import NewProj from './components/NewProj/NewProj';
import AdminDash from './components/AdminDash/AdminDash';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { useEffect } from 'react';


function App() {
    useEffect(() => {
      document.body.style.backgroundColor = "black";
    }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/newproject" element={<NewProj />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
