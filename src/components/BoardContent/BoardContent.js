import Column from '../Column/Column'
import './BoardContent.scss'
import {initialData } from '../../actions/initalData'
import { useState, useEffect } from 'react';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';

export default function BoardContent(){
    const [board, setBoard] = useState({});
    const [columns, setColumns]= useState([]);

    useEffect(()=>{
        const boardInitData = initialData.boards.find(item => item.id === 'board-1');
        if(boardInitData){
            setBoard(boardInitData);

            // sort columns
            setColumns(mapOrder(boardInitData.columns,boardInitData.columnOrder, 'id'))
        }
    },[])
    if(isEmpty(board)){
        return(
            <>
                <div className='not-found'>
                    Board not found
                </div>
            </>
        )
    }

    return(
        <div className="board-columns">
            {columns && columns.length > 0 && columns.map((column, index)=>{
                return(
                    <Column 
                        key={column.id}
                        column = {column}
                    />
                )
            })}

      </div>
    )
}