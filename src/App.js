import React, { useEffect } from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.css';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Register from './components/Register';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    fetch('')
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route
          path="/"
          element={<Navigate to="/main_page"/>}
          />
          ):(
            <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>}/>
          )}
        <Route path="/main_page" element={<MainPage/>}/>
      </Routes>
    //   </BrowserRouter>
    </div>
  );
}

export default App;
