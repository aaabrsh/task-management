import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import BoardForm from "./BoardForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../reducers/boardSlice";

function BoardCard({ board, setLoading }) {
  const [description, showDescription] = useState();
  const [open, openDialog] = useState(false);
  const [confirmDialog, openConfirmDialog] = useState(false);
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

  const handleDelete = (id) => {
    openConfirmDialog(false);
    setLoading(true);
    dispatch(deleteBoard(id)).then(() => setLoading(false));
  };

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
            <div className="flex justify-center mb-2 gap-3">
              <div
                className="p-1 px-3 cursor-pointer rounded bg-blue-100 hover:border hover:border-blue-400"
                title="edit"
                onClick={() => openDialog(true)}
              >
                <EditIcon fontSize="small" className="text-blue-400" />
              </div>
              <div
                className="p-1 px-3 cursor-pointer rounded bg-red-100 hover:border hover:border-red-500"
                title="delete"
              >
                <DeleteForeverIcon
                  fontSize="small"
                  className="text-red-500"
                  onClick={() => openConfirmDialog(true)}
                />
              </div>
            </div>
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
            board_id={board._id}
            closeForm={() => openDialog(false)}
            formData={board}
            isEditForm={true}
          />
        </div>
      </Dialog>
      <ConfirmationDialog
        type={"board"}
        id={board._id}
        status={confirmDialog}
        confirmed={handleDelete}
        closeDialog={() => openConfirmDialog(false)}
      />
    </>
  );
}

export default BoardCard;
