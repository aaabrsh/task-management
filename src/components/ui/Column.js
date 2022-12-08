import React from "react";
import Task from "./Task";

function Column({ title, tasks, column, dragStart, dragEnter, dropItem }) {
  return (
    <div className="column" onDragEnter={dragEnter}>
      <div className="column-header">{title}</div>
      <div className="column-body">
        {tasks.map((task) => (
          <div
            key={task.id}
            onDragStart={(e) => dragStart(e, task.id, column)}
            onDragEnd={dropItem}
            draggable="true"
          >
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
