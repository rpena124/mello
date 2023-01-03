export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder:['column-1','column-2','column-3'],
            columns:[
                {
                    id:'column-1',
                    boardId:'board-1',
                    title:'Todo 1',
                    cardOrder: ['card-1', 'card-2','card-3','card-4', 'card-5','card-6','card-7'],
                    cards:[
                        {id:'card-1',boardId:'board-1',column:'column-1', title:'title of card 1', img: null},
                        {id:'card-2',boardId:'board-1',column:'column-1', title:'title of card 2', img: null},
                        {id:'card-3',boardId:'board-1',column:'column-1', title:'title of card 3', img: null},
                        {id:'card-4',boardId:'board-1',column:'column-1', title:'title of card 4', img: null},
                        {id:'card-5',boardId:'board-1',column:'column-1', title:'title of card 5', img: null},
                        {id:'card-6',boardId:'board-1',column:'column-1', title:'title of card 6', img: null},
                        {id:'card-7',boardId:'board-1',column:'column-1', title:'title of card 7', img: null},
                        {id:'card-8',boardId:'board-1',column:'column-1', title:'title of card 8', img: null},
                        {id:'card-9',boardId:'board-1',column:'column-1', title:'title of card 9', img: null},
                        {id:'card-10',boardId:'board-1',column:'column-1', title:'title of card 10', img: null},
                    ]
                },
                {
                    id:'column-2',
                    boardId:'board-1',
                    title:'Todo 2',
                    cardOrder: ['card-8','card-9','card-10'],
                    cards:[
                        {id:'card-8',
                        boardId:'board-1',
                        column:'column-2', 
                        title:'title of card 8', 
                        img: "https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png"},
                        {id:'card-9',boardId:'board-1',column:'column-2', title:'title of card 9', img: null},
                        {id:'card-10',boardId:'board-1',column:'column-2', title:'title of card 10', img: null}
                    ]
                },
                {
                    id:'column-3',
                    boardId:'board-1',
                    title:'Todo 3',
                    cardOrder: ['card-11','card-12','card-13'],
                    cards:[
                        {id:'card-11',boardId:'board-1',column:'column-3', title:'title of card 11', img: null},
                        {id:'card-12',boardId:'board-1',column:'column-3', title:'title of card 12', img: null},
                        {id:'card-13',boardId:'board-1',column:'column-3', title:'title of card 13', img: null}
                    ]
                }
            ]
        }
    ]
}