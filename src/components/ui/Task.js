import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Divider, MenuItem, MenuList, Paper, Popover } from "@mui/material";
import { priorityIcon } from "../../utils/priorityIcon";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../reducers/taskSlice";
import ConfirmationDialog from "./ConfirmationDialog";

function Task({ task, taskClick, setLoading }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [confirmDialog, openConfirmDialog] = useState(false);
  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleBackClick = () => {
    setAnchorElement(false); //close pop over
    let destination = task.status;
    switch (task.status) {
      case "todo":
        destination = "backlog";
        break;
      case "in-progress":
        destination = "todo";
        break;
      case "completed":
        destination = "in-progress";
        break;
    }
    setLoading(true);
    dispatch(editTask(task._id, { status: destination })).then(() =>
      setLoading(false)
    );
  };

  const handleForwardClick = () => {
    setAnchorElement(false); //close pop over
    let destination = task.status;
    switch (task.status) {
      case "backlog":
        destination = "todo";
        break;
      case "todo":
        destination = "in-progress";
        break;
      case "in-progress":
        destination = "completed";
        break;
    }
    setLoading(true);
    dispatch(editTask(task._id, { status: destination })).then(() =>
      setLoading(false)
    );
  };

  const handleDelete = (id) => {
    openConfirmDialog(false);
    setLoading(true);
    dispatch(deleteTask(task._id)).then(() => setLoading(false));
  };

  return (
    <div className="task-container">
      <div className="flex h-[30px] items-center text-gray-500">
        <span className="flex-grow cursor-move">{task.task_id}</span>
        <span
          className="cursor-pointer p-0.5 rounded-3xl border hover:border-2 hover:border-blue-300"
          onClick={handleMenuClick}
        >
          <MoreVertIcon sx={{ fontSize: "20px" }} />
        </span>
        <Popover
          open={anchorElement ? true : false}
          anchorEl={anchorElement}
          onClose={() => setAnchorElement(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div>
            <Paper sx={{ width: 120, color: "#666" }}>
              <MenuList>
                <div className="h-[20px] flex justify-between px-4 mb-2">
                  <span className="icon-btn" onClick={handleBackClick}>
                    {task.status !== "backlog" && (
                      <ArrowBack sx={{ fontSize: 20 }} />
                    )}
                  </span>
                  <span className="icon-btn" onClick={handleForwardClick}>
                    {task.status !== "completed" && (
                      <ArrowForward sx={{ fontSize: 20 }} />
                    )}
                  </span>
                </div>
                <Divider />
                <MenuItem
                  sx={{ height: 25, fontSize: 13 }}
                  onClick={() => {
                    setAnchorElement(false);
                    taskClick(task);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  sx={{ height: 25, fontSize: 13 }}
                  onClick={() => {
                    setAnchorElement(false);
                    openConfirmDialog(true);
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Paper>
          </div>
        </Popover>
      </div>
      <div className="cursor-move" onClick={() => taskClick(task)}>
        <div>{task.name}</div>
        <div className="flex h-[30px] items-center text-gray-500 text-xs">
          <span className="flex-grow">Deadline: {task.deadline}</span>
          <span title={task.priority}>{priorityIcon(task.priority)}</span>
        </div>
      </div>
      <ConfirmationDialog
        type={"task"}
        id={task._id}
        status={confirmDialog}
        confirmed={handleDelete}
        closeDialog={() => openConfirmDialog(false)}
      />
    </div>
  );
}

export default Task;
