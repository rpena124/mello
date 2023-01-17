import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "../../components/BoardBar/BoardBar";
import BoardContent from "../../components/BoardContent/BoardContent";
import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request'
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { applyDrag } from '../../utilities/dragDrop';
import _, { isEmpty } from 'lodash';
import { Container, Draggable } from 'rosa-react-smooth-dnd';
import List from '../../components/List/List'

export default function BoardPage(
    {
        deleteBoard,
        updateBoard,
    }
) {
    const params = useParams()
    const id = params.id
    const title = params.title

    // const [columns, setColumns] = useState([])
    // const [foundColumn, setFoundColumn] = useState({})
    // const [newColumn, setNewColumn] = useState({
    //     title: '',
    //     card: []
    // })
    const [showInput, setShowInput] = useState(false)
    const [lists, setLists] = useState([])
    const [newList, setNewList] = useState([])
    const [foundBoard, setFoundBoard] = useState({})

  const [dragOver, setDragOver] = useState("");
    // const handleChange = (evt) => {
    //     setNewColumn({ ...newColumn, [evt.target.title]: evt.target.value })
    // }

    //Show
    const showBoard = async (id) => {
        try {
            // const index = boards.findIndex((board) => board._id === id)
            // const boardsCopy = [...boards]
            // const copyFoundBoard = boardsCopy[index]
            const response = await sendRequest(`/api/boards/${id}`, "GET", null)
            setFoundBoard(response)

        } catch (error) {
            console.error(error)
        }
    }
    //index
    const getLists = async () => {
        try {
            const response = await sendRequest('/api/lists')
            setLists(response)
        } catch (error) {
            console.error(error)
        }
    }
    // create
    const createList = async (boardId) => {
        const body = { ...newList }
        try {
            const response = await sendRequest(`/api/lists/${boardId}`, 'POST', body)
            // const createdBoard = await response.json()
            const listCopy = [response, ...lists]
            setLists(listCopy)
            setNewList({
                title: '',
                card: []
            })

        } catch (error) {
            console.error(error)
        } finally {
            showBoard(boardId)
        }
    }

          //delete
  const deleteList = async (id) => {
        try {
            const index = lists.findIndex((list) => list._id === id)
            const listsCopy = [...lists]
            const response = await sendRequest(`/api/lists/${id}`, "DELETE", null)
    
            listsCopy.splice(index, 1)
            setLists(listsCopy)
        } catch (error) {
            console.error(error)
        }
    }

    // const onListDrop = (dropResult) => {
    //     let newLists = [...lists];
    //     newLists = applyDrag(newLists, dropResult);

    //     let newBoard = { ...foundBoard }
    //     newBoard.listOrder = newLists.map(list => list._id);
    //     newBoard.lists = newLists;

    //     setLists(newLists);
    //     setFoundBoard(newBoard);
    // }

    const handleDragStart = e => {
        const { id } = e.target;
        const idx = lists.indexOf(id);
        e.dataTransfer.setData("listIdx", idx);
    };

    const handleDragOver = e => e.preventDefault();
    const handleDragEnter = e => {
      const { id } = e.target;
      setDragOver(id);
    };

    const handleOnDrop = e => {
        const { id } = e.target;
        const droppedListIdx = lists.indexOf(id);
        const draggedListIdx = e.dataTransfer.getData("listIdx");
        const tempLists = [...lists];
    
        tempLists[draggedListIdx] = List[droppedListIdx];
        tempLists[droppedListIdx] = List[draggedListIdx];
        setLists(tempLists);
        setDragOver("");
    };

    

    // const onCardDrop = (dropResult, listId) => {
    //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    //         console.log(">>>>>inside onCardDrop", dropResult, 'with ColumnId', listId)

    //         let newLists = [...lists];

    //         let currentList = newLists.find(list => list._id === listId)

    //         currentList.cards = applyDrag(currentList.card, dropResult);
    //         currentList.cardOrder = currentList.card.map(card => card._id)
    //         console.log(">>> Current column", currentList)

    //         setLists(newLists);

    //     }

    // }

    useEffect(() => {
        showBoard(id)
    }, [])

    return (

        <div className="trello-master">

            <AppBar
                id={id}
                title={title}
            />
            <div className="board-columns">
                <Container
                    orientation="horizontal"
                    getChildPayload={index => lists[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >
                    {foundBoard.list && foundBoard.list.length > 0 &&
                        foundBoard.list.map((list, i) => {
                            return (
                                <Draggable key={list._id}>
                                    <List
                                        list={list}
                                        onDragStart={handleDragStart}
                                        onDragOver={handleDragOver}
                                        onDrop={handleOnDrop}
                                        showBoard ={showBoard}
                                        boardId={id}
                                        deleteList = {deleteList}
                                    />
                                </Draggable>
                            )
                        })}
                    <div className='add-new-column'>
                        <i className="fa fa-plus icon"></i>Add another column
                        <input
                            type="text"
                            className="form-input"
                            value={newList.title}
                            onChange={(e) => {
                                setNewList({ ...newList, title: e.target.value })
                            }}
                            onKeyDown={(e) => {
                                e.key === 'Enter' && createList(id)
                            }}
                        >
                        </input>
                    </div>
                </Container>
            </div>

        </div>
    )
}