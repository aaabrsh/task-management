import React, { useState } from "react";
import Task from "./Task";

function Column({
  title,
  tasks,
  column,
  dragItemStart,
  dragOverCol,
  dropItem,
  dragEnter,
  dragLeave,
  isHovered = false,
  hoverStarted,
  draggedItemId,
  taskClick,
  moveTask,
}) {
  return (
    <div
      className="column hover"
      onDrop={dropItem}
      onDragOver={dragOverCol}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      <div className="column-header">{title}</div>
      <div className={"column-body " + (isHovered && " column-body-hover")}>
        {tasks.map((task) => (
          <div
            key={task.id}
            onDragStart={(e) => {
              dragItemStart(e, task.id, column);
            }}
            draggable="true"
            className={
              draggedItemId != task.id
                ? hoverStarted
                  ? "invisible"
                  : "visible opacity-1"
                : "opacity-50"
            }
          >
            <Task
              task={task}
              taskClick={taskClick}
              moveTask={(destination) => moveTask(task.id, destination)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
