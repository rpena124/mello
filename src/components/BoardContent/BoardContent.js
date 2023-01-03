import Column from '../Column/Column'
import './BoardContent.scss'
import { initialData } from '../../actions/initalData'
import { useState, useEffect } from 'react';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';


export default function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardInitData = initialData.boards.find(item => item.id === 'board-1');
        if (boardInitData) {
            setBoard(boardInitData);

            // sort columns
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
        }
    }, [])

    const onColumnDrop = (dropResult) =>{
        console.log('>>>>>inside', dropResult)
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
                            />
                        </Draggable>
                    )
                })}
            </Container>
        </div>
    )
}