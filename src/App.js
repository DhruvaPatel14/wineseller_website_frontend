import logo from './logo.svg';
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import login from './pages/login';
import './App.css';

function App() {
  return (
    
        <Router>
            {/* <Switch> */}
                <Route path="/login" exact component={login} />
                {/* Add other routes here */}
            {/* </Switch> */}
        </Router>
    );
  
}

export default App;