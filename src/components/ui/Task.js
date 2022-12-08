import React from "react";

function Task({ task }) {
  return <div className="task-container">{task.name}</div>;
}

export default Task;
