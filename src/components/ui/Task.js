import React from "react";

function Task({ task }) {
  return <div draggable="true" className="task-container">
    {task.name}
  </div>;
}

export default Task;
