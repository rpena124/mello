
import './HomePage.scss'
import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request'
import {Link} from 'react-router-dom'
import BoardPage from '../BoardPage/BoardPage';


export default function HomePage() {
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
    const updateBoardTitle = async (id, e) => {

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
        getBoards()
    }, [foundBoard])


    return (
        <>
            <h1>Boards Display Page</h1>
            <h1>Home</h1>
            {
                boards && boards.length ? 
                (<div className='board-container container-lg'>
                    {
                        boards.map((board, i)=>{
                            return(
                                <div
                                    key={board._id} 
                                    className='boards'
                                    onClick={(e) => {
                                        <input text="text" defaultValue={board.title} value={board.title}  /> ; showBoard(board._id) }
                                    }
                                > 
                                <Link to={`/boards/${board._id}/${board.title}`}> {board.title} </Link>

                                {/* <h3 onClick={(e) => {setShowInput(!showInput)}}>
                                    {board.title}  
                                </h3> */}
                                {/* <input 
                                          style={{ display: showInput ? "block" : "none" }}
                                          type="text"
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              updateBoardTitle(board._id,e)
                                              setShowInput(false)
                                            }
                                          }}

                                /> */}
                                     <br/><button onClick={() => deleteBoard(board._id)}>Delete</button>
                                </div>
                            )

                        })
                    }
                </div>) :
                <h1>No Boards</h1>
            }
            <i className='fa fa-plus icon add-new-board'>
                    {/* <br />{' Title '} */}
                    <input 
                        type="text" 
                        value={newBoard.title} 
                        onChange={(e) => {
                            setNewBoard({...newBoard, title: e.target.value})
                        }} 
                        onKeyDown={(e) => {
                            e.key === 'Enter' && createBoard()
                        }}
                    >
                    </input>
                </i>
            <br/>
        </>
    )
}