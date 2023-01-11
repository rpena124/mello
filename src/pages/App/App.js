import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import HomePage from '../HomePage/HomePage';
import BoardPage from '../BoardPage/BoardPage';
import NavBar from '../../components/NavBar/NavBar';
import {getUser} from '../../utilities/users-service'

function App() {
  const [user, setUser ] = useState(getUser())
 
  return (
    <main className="App">
      {
        user ?
        <>
        <NavBar setUser={setUser}/>
          <Routes>
            <Route path={"/boards" } element={<HomePage />} />
            <Route path={`/boards/new`} element={<BoardPage />} />
            <Route path={`/boards/:id/:title`} 
              element={<BoardPage />} />
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );

}

export default App;
