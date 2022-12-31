// import { useState, useEffect } from 'react';
// import AuthPage from '../AuthPage/AuthPage';
// import NewOrderPage from '../NewOrderPage/NewOrderPage';
// import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import NavBar from '../../components/NavBar/NavBar';
// import { Routes, Route} from 'react-router-dom'
// import './App.module.scss'


function App() {
  
  return (

    <div className="trello-master">
      <nav className="navbar app"> App Bar</nav>
      <nav className="navbar board"> Board Bar</nav>
      <div className="board-columns">
        <div className="column">
          <header>Brainstorm</header>
          <ul className="list">
            <li className="card">
              <img src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png" />
              Design & Research
            </li>
            <li className="card">second</li>
            <li className="card">third</li>
            <li className="card">second</li>
            <li className="card">third</li>
            <li className="card">second</li>
            <li className="card">third</li>
            <li className="card">second</li>
            <li className="card">third</li>
            <li className="card">second</li>
            <li className="card">third</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul className="list">
            <li className="card">
              <img src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png" />
              Design & Research
            </li>
            <li className="card">second</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul className="list">
            <li className="card">
              <img src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png" />
              Design & Research
            </li>
            <li className="card">second</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul className="list">
            <li className="card">
              <img src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png" />
              Design & Research
            </li>
            <li className="card">second</li>
          </ul>
          <footer>Add another card</footer>
        </div>
      </div>
    </div>

  );
}

export default App;
