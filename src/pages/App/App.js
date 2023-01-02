// import { useState, useEffect } from 'react';
// import AuthPage from '../AuthPage/AuthPage';
// import NewOrderPage from '../NewOrderPage/NewOrderPage';
// import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import NavBar from '../../components/NavBar/NavBar';
// import { Routes, Route} from 'react-router-dom'
// import './App.module.scss'

import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "../../components/BoardBar/BoardBar";
import BoardContent from "../../components/BoardContent/BoardContent";


function App() {
  
  return (

    <div className="trello-master">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>

  );
}

export default App;
