import React from "react";
import Task from "./Task";

function Column({ title, tasks }) {
  return (
    <div className="column">
      <div className="column-header">{title}</div>
      <div className="column-body">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default Column;
