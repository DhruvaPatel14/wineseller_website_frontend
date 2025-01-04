import logo from './logo.svg';
import React, { useState } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ULogin from './pages/ULogin';
import Home from './pages/Home/Home';
import Cart from './pages/Single Pages/Cart'; 
import './App.css';

function App() {
  return (
    
        <Router>
            <Routes>
            <Route exact  path="/"  element={<ULogin />} />
            <Route path="/Home"  element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            </Routes>
        </Router>
    );
  
}

export default App;