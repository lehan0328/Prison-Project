import React, { useEffect } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.css';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Register from './components/Register';
import axios from 'axios';


import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App">
      <header className='headerBox'>
        <div className='header1'>
          <i class="ms-Icon ms-Icon--Badge" aria-hidden="true" style={{ fontSize: "55px" }}></i>
        </div>
        <div className='header2'>Tandon Police DEPT DB</div>
        </header>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path="/main_page" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
