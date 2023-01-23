import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask, moveTask } from "../../reducers/taskSlice";
import Task from "./Task";

function Column({
  title,
  tasks,
  column,
  dragItemStart,
  dragEnd,
  dragOverCol,
  dropItem,
  dragEnter,
  dragLeave,
  isHovered = false,
  hoverStarted,
  draggedItemId,
  taskClick,
}) {
  const dispatch = useDispatch();
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
            key={task._id}
            onDragStart={(e) => {
              dragItemStart(e, task._id, column);
            }}
            onDragEnd={dragEnd}
            draggable="true"
            className={
              draggedItemId != task._id
                ? hoverStarted
                  ? "invisible"
                  : "visible opacity-1"
                : "opacity-50"
            }
          >
            <Task
              task={task}
              taskClick={taskClick}
              moveTask={(destination) => {
                dispatch(editTask(task._id, { status: destination }));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
