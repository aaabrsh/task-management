import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import BoardForm from "./BoardForm";
import { useDispatch } from "react-redux";
import { editBoard } from "../../reducers/boardSlice";

function BoardCard({ board }) {
  const [description, showDescription] = useState();
  const [open, openDialog] = useState(false);
  const dispatch = useDispatch();

  const descriptionView = <p>{board.description}</p>;

  const defaultView = (
    <>
      <h1 className="mb-2 text-lg">{board.name}</h1>
      <p className="truncate">{board.description}</p>
      <hr className="mb-1" />
      <ul className="mb-3 flex-grow flex flex-col justify-center">
        <li className="list">
          <div className="list-label">Backlog Tasks: </div>
          <div className="badge">?</div>
        </li>
        <li className="list">
          <div className="list-label">Todo Tasks: </div>
          <div className="badge">?</div>
        </li>
        <li className="list">
          <div className="list-label">In Progress Tasks: </div>
          <div className="badge">?</div>
        </li>
        <li className="list">
          <div className="list-label">Completed Tasks: </div>
          <div className="badge">?</div>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <div className="board-card">
        <div
          className="flex-grow cursor-pointer"
          onClick={() => showDescription((desc) => !desc)}
        >
          {description && descriptionView}
          {!description && defaultView}
        </div>
        {!description && (
          <div className="flex flex-col">
            <button
              className="button bg-yellow-500/50 hover:bg-yellow-500 mb-2"
              onClick={() => openDialog(true)}
            >
              Edit Board
            </button>
            <Link
              className="button bg-blue-900/80 hover:bg-blue-900 text-white"
              to={"/boards/" + board._id}
            >
              Open Board
            </Link>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={() => openDialog(false)}
        fullWidth={true}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "900px",
            maxHeight: "auto",
            borderRadius: "15px",
            border: "1px solid teal",
          },
        }}
      >
        <div className="px-10 py-8">
          <h1 className="text-3xl text-teal-900">Edit Board</h1>
          <BoardForm
            onFormSubmit={(payload) =>
              dispatch(editBoard(board._id, payload)).then((res) =>
                openDialog(!res)
              )
            }
            closeForm={() => openDialog(false)}
            formData={board}
            isEditForm={true}
          />
        </div>
      </Dialog>
    </>
  );
}

export default BoardCard;
