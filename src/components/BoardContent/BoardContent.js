import Column from '../Column/Column'
import './BoardContent.scss'
import { initialData } from '../../actions/initalData'
import { useState, useEffect } from 'react';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'rosa-react-smooth-dnd';
import {applyDrag} from '../../utilities/dragDrop';

import sendRequest from '../../utilities/send-request'
import { useParams } from "react-router-dom";

export default function BoardContent(
    {
        columns,
        setColumns,
        foundColumn,
        setFoundColumn,
        newColumn,
        setNewColumn,
        getColumns,
        deleteColumn,
        updateColumnTitle,
        createColumn,
        handleChange
    }
) {
    const [board, setBoard] = useState({});
    const params = useParams()
    const boardId = params.id

    useEffect(() => {
        const boardInitData = initialData.boards.find(item => item.id === 'board-1');
        if (boardInitData) {
            setBoard(boardInitData);

            // sort columns
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        }

        // const boardInitData = board.find(item => item.id === boardId);
        // if (boardInitData) {
        //     setBoard(boardInitData);

        //     // // sort columns
        //     // setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        // }

    }, [])
    // useEffect(() => {
    //     getColumns()
    // }, [foundColumn])

    const onColumnDrop = (dropResult) =>{
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns,dropResult);
        
        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const onCardDrop = (dropResult, columnId) => {
        if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
            console.log(">>>>>inside onCardDrop", dropResult, 'with ColumnId', columnId)

            let newColumns = [...columns];

            let currentColumn = newColumns.find(column => column.id === columnId)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id)
            console.log(">>> Current column", currentColumn)

            setColumns(newColumns);

        }

    }

    if (_.isEmpty(board)) {
        return (
            <>
                <div className='not-found'>
                    Board not found
                </div>
            </>
        )
    }

    return (
        <div className="board-columns">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload = {index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns && columns.length > 0 && columns.map((column, index) => {
                    return (
                        <Draggable key={column.id}>
                            <Column
                                column={column}
                                onCardDrop = {onCardDrop}
                            />
                        </Draggable>
                    )
                })}
                <div className='add-new-column'>
                    <i className="fa fa-plus icon"></i>Add another column
                </div>
            </Container>
        </div>
    )
}