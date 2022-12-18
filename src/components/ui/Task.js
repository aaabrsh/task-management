import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Divider, MenuItem, MenuList, Paper, Popover } from "@mui/material";

function Task({ task, taskClick, moveTask }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [open, setOpen] = useState(false);

  const priorityIcon = (priority) => {
    switch (priority) {
      case "low":
        return <HorizontalRuleIcon sx={{ color: "limegreen" }} />;
      case "medium":
        return <KeyboardCapslockIcon sx={{ color: "orange" }} />;
      case "high":
        return <KeyboardDoubleArrowUpIcon sx={{ color: "red" }} />;
    }
  };

  const handleMenuClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleBackClick = () => {
    switch (task.status) {
      case "todo":
        moveTask("backlog");
        break;
      case "in-progress":
        moveTask("todo");
        break;
      case "completed":
        moveTask("in-progress");
        break;
    }
  };

  const handleForwardClick = (event) => {
    switch (task.status) {
      case "backlog":
        moveTask("todo");
        break;
      case "todo":
        moveTask("in-progress");
        break;
      case "in-progress":
        moveTask("completed");
        break;
    }
  };

  return (
    <div className="task-container">
      <div className="flex h-[30px] items-center text-gray-500">
        <span className="flex-grow">{task.id}</span>
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
                <MenuItem sx={{ height: 25, fontSize: 13 }}>Edit</MenuItem>
                <MenuItem sx={{ height: 25, fontSize: 13 }}>Delete</MenuItem>
              </MenuList>
            </Paper>
          </div>
        </Popover>
      </div>
      <div className="cursor-pointer" onClick={() => taskClick(task)}>
        <div>{task.name}</div>
        <div className="flex h-[30px] items-center text-gray-500 text-xs">
          <span className="flex-grow">Deadline: {task.deadline}</span>
          <span title={task.priority}>{priorityIcon(task.priority)}</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
