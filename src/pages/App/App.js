import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom'
import './App.scss'


function App() {

  const [boards, setBoards] = useState(null)
  const[foundBoard, setFoundBoard] = useState(null)
  const [newBoard, setNewBoard] = useState({
    title: '',
    list: ''
  })

  //index
  const getBoards = async () => {
    try {
      const response = await fetch('/api/boards')
      const data = await response.json()
      setBoards(data)
    } catch (error) {
      console.error(error)
    }
  }

  //delete
  const deleteBoard = async (id) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundBoard(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update
  const updateBoard = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
      })
      const data = await response.json()
      setFoundBoard(data)
    } catch (error) {
      console.error(error)
    }
  }
  // create
  const createBoard = async () => {
    try {
      const response = await fetch(`/api/boards`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newBoard })
      })
      const data = await response.json()
      setFoundBoard(data)
      setNewBoard({
        title: '',
        list: ''
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handleChange = (evt) => {
    setNewBoard({ ...newBoard, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    getBoards()
  }, [foundBoard])

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar />
          <Routes>
            <Route path="/boards" element={<FruitsPage />} />
            <Route path="/boards/new" element={<NewOrderPage />} />
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );

}

export default App;
