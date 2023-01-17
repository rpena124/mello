import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import HomePage from '../BoardsPage/BoardsPage';
import BoardPage from '../BoardPage/BoardPage';
import NavBar from '../../components/NavBar/NavBar';
import {getUser} from '../../utilities/users-service'
import sendRequest from '../../utilities/send-request'
import BoardsPage from '../../pages/BoardsPage/BoardsPage'
function App() {
  const [user, setUser ] = useState(getUser())
  const [boards, setBoards] = useState([])
  const [foundBoard, setFoundBoard] = useState({})
  const [newBoard, setNewBoard] = useState({
      title: '',
      list: []
  })
  const [showInput, setShowInput] = useState(false)

  //index
  const getBoards = async () => {
      try {
          const response = await sendRequest('/api/boards')
          setBoards(response)
      } catch (error) {
          console.error(error)
      }
  }

  //delete
  const deleteBoard = async (id) => {
      try {
          const index = boards.findIndex((board) => board._id === id)
          const boardsCopy = [...boards]
          const response = await sendRequest(`/api/boards/${id}`, "DELETE", null)
    
          boardsCopy.splice(index, 1)
          setBoards(boardsCopy)
      } catch (error) {
          console.error(error)
      }
  }
  // update
  const updateBoard = async (id, e) => {

      const boardsCopy = [...boards]
      const indexOfBoard = boardsCopy.findIndex((board)=> board._id === id)
      try {
          const response = await sendRequest(`/api/boards/${id}`, "PUT", {title: e.target.value}) 
          setFoundBoard(response)
          boardsCopy[indexOfBoard].title = e.target.value
          setBoards([...boardsCopy])
          e.target.value = ""

      } catch (error) {
          console.error(error)
      }
  }
  // create
  const createBoard = async () => {
      const body = {...newBoard}
      try {
          const response = await sendRequest(`/api/boards`, 'POST', body)
          // const createdBoard = await response.json()
          const boardCopy = [response, ...boards]
          setBoards(boardCopy)
          setNewBoard({
              title: '',
              list: []
          })
      } catch (error) {
          console.error(error)
      }
  }

  //Show
  const showBoard = async (id) => {
      try {
          const index = boards.findIndex((board) => board._id === id)
          const boardsCopy = [...boards]
          const copyFoundBoard = boardsCopy[index]
          const response = await sendRequest(`/api/boards/${id}`, "GET", null)
          setFoundBoard(copyFoundBoard)
          console.log(foundBoard)
      } catch (error) {
          console.error(error)
      }
  }

  const handleChange = (evt) => {
      setNewBoard({ ...newBoard, [evt.target.title]: evt.target.value })
  }

  useEffect(() => {
      // getBoards()
      getBoards()
  }, [foundBoard])
  
  return (
    <main className="App">
      {
        user ?
        <>
        <NavBar setUser={setUser}/>
          <Routes>
            <Route path={"/boards" } 
            element={<BoardsPage 
                boards={boards}
                setBoards ={setBoards}
                newBoard ={newBoard}
                setNewBoard = {setNewBoard}
                getBoards = {getBoards}
                deleteBoard = {deleteBoard}
                updateBoard ={updateBoard}
                createBoard = {createBoard}
                showBoard = {showBoard}
                handleChange = {handleChange}
                foundBoard = {foundBoard}
            />} />
            <Route path={`/boards/:id/:title`} 
              element={<BoardPage 
                foundBoard = {foundBoard}
                deleteBoard = {deleteBoard}
                updateBoard ={updateBoard}
                boards={boards}
                showBoard ={showBoard}
                getBoards = {getBoards}
                setFoundBoard = {setFoundBoard}
              />} />
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );

}

export default App;
