import { useState, useEffect } from "react";
import sendRequest from "../../utilities/send-request";
import { Link } from "react-router-dom";
import BoardPage from "../BoardPage/BoardPage";

export default function HomePage({
  boards,
  setNewBoard,
  setBoards,
  getBoards,
  foundBoard,
  showBoard,
  newBoard,
  createBoard,
  deleteBoard,
}) {
  useEffect(() => {
    getBoards();
  }, [foundBoard]);

  return (
    <>
      <h1>Boards Display Page</h1>
      <h1>Home</h1>
      {boards && boards.length ? (
        <div className="boards-container container-lg">
          {boards.map((board, i) => {
            return (
              <div
                key={board._id}
                className="boards"
                onClick={(e) => {
                  <input
                    text="text"
                    defaultValue={board.title}
                    value={board.title}
                  />;
                  showBoard(board._id);
                }}
              >
                <Link to={`/boards/${board._id}/${board.title}`}>
                  {" "}
                  {board.title}{" "}
                </Link>

                <br />
                <button onClick={() => deleteBoard(board._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No Boards</h1>
      )}
      <i className="fa fa-plus icon add-new-board">
        {/* <br />{' Title '} */}
        <input
          type="text"
          value={newBoard.title}
          onChange={(e) => {
            setNewBoard({ ...newBoard, title: e.target.value });
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && createBoard();
          }}
        ></input>
      </i>
      <br />
    </>
  );
}
