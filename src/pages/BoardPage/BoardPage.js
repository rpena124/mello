import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "../../components/BoardBar/BoardBar";
import BoardContent from "../../components/BoardContent/BoardContent";
import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request'
import './BoardPage.scss'
import { useParams } from "react-router-dom";


export  default function BoardPage(props){
    const params = useParams()
    const id = params.id
    const title = params.title

    const [columns, setColumns] = useState([])
    const [foundColumn, setFoundColumn] = useState({})
    const [newColumn, setNewColumn] = useState({
        title: '',
        card: []
    })
    const [showInput, setShowInput] = useState(false)

    //index
    const getColumns = async () => {
        try {
            const response = await sendRequest('/api/lists')
            setColumns(response)
        } catch (error) {
            console.error(error)
        }
    }

    //delete
    const deleteColumn = async (id) => {
        try {
            const index = columns.findIndex((column) => column._id === id)
            const columnsCopy = [...columns]
            const response = await sendRequest(`/api/lists/${id}`, "DELETE", null)
      
            columnsCopy.splice(index, 1)
            setColumns(columnsCopy)
        } catch (error) {
            console.error(error)
        }
    }
    // update
    const updateColumnTitle = async (id, e) => {

        const columnsCopy = [...columns]
        const indexOfColumn = columnsCopy.findIndex((column)=> column._id === id)
        try {
            const response = await sendRequest(`/api/lists/${id}`, "PUT", {title: e.target.value}) 
            setFoundColumn(response)
            columnsCopy[indexOfColumn].title = e.target.value
            setColumns([...columnsCopy])
            e.target.value = ""

        } catch (error) {
            console.error(error)
        }
    }
    // create
    const createColumn = async () => {
        const body = {...newColumn}
        try {
            const response = await sendRequest(`/api/lists`, 'POST', body)
            // const createdBoard = await response.json()
            const columnCopy = [response, ...columns]
            setColumns(columnCopy)
            setNewColumn({
                title: '',
                card: []
            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleChange = (evt) => {
        setNewColumn({ ...newColumn, [evt.target.title]: evt.target.value })
    }

    useEffect(() => {
        getColumns()
        console.log(columns)
    }, [foundColumn])

    return(
        
        <div className="trello-master">
            <AppBar 
                id={id}
                title={title}
            />
            <BoardBar />
            <BoardContent 
                columns={columns}
                setColumns={setColumns}
                foundColumn={foundColumn}
                setFoundColumn={setFoundColumn}
                newColumn={newColumn}
                setNewColumn={setNewColumn}
                getColumns={getColumns}
                deleteColumn={deleteColumn}
                updateColumnTitle={updateColumnTitle}
                createColumn={createColumn}
                handleChange={handleChange}
            />
      </div>
    )
}