import AppBar from "../../components/AppBar/AppBar";
import BoardBar from "../../components/BoardBar/BoardBar";
import BoardContent from "../../components/BoardContent/BoardContent";
import './Board.scss'

export  default function Board(props){
    return(
        <div className="trello-master">
            <AppBar />
            <BoardBar />
            <BoardContent />
      </div>
    )
}