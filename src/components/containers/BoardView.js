import { Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BoardForm from "../ui/BoardForm";
import Column from "../ui/Column";

const BoardView = ({ board, tasks, moveTask }) => {
  const noHoverState = {
    backlog: false,
    todo: false,
    inProgress: false,
    completed: false,
  };
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [open, openDialog] = useState(false);
  const [isHovered, setHovered] = useState(noHoverState);
  const [hoverStarted, setHoverStarted] = useState(false);
  const [draggedItemId, setDraggedItem] = useState(null);
  const dragItem = useRef();
  const dragOverColumn = useRef();
  const dragFromColumn = useRef();

  useEffect(() => {
    var temp_backlogTasks = [];
    var temp_todoTasks = [];
    var temp_inProgressTasks = [];
    var temp_completedTasks = [];
    tasks.map((task) => {
      switch (task.status) {
        case "backlog":
          temp_backlogTasks.push(task);
          break;
        case "todo":
          temp_todoTasks.push(task);
          break;
        case "in-progress":
          temp_inProgressTasks.push(task);
          break;
        case "completed":
          temp_completedTasks.push(task);
          break;
      }
    });
    setBacklogTasks([...temp_backlogTasks]);
    setTodoTasks([...temp_todoTasks]);
    setInProgressTasks([...temp_inProgressTasks]);
    setCompletedTasks([...temp_completedTasks]);
  }, [tasks]);

  const handleDragItemStart = (event, id, column) => {
    setHoverStarted(true);
    dragItem.current = tasks.find((task) => task.id === id);
    dragFromColumn.current = column;
    setDraggedItem(id);
  };

  const handleDragOverCol = (e, col) => {
    e.preventDefault();
    dragOverColumn.current = col;
  };

  const handleDragLeaveCol = (column) => {
    setHovered((cur) => ({ ...cur, [column]: false }));
  };

  const handleDragEnterCol = (column) => {
    setHovered((cur) => ({ ...cur, [column]: true }));
  };

  const handleDropItem = () => {
    if (dragFromColumn.current != dragOverColumn.current) {
      switch (dragFromColumn.current) {
        case "backlog":
          setBacklogTasks((tasks) =>
            tasks.filter((task) => task.id !== dragItem.current.id)
          );
          break;
        case "todo":
          setTodoTasks((tasks) =>
            tasks.filter((task) => task.id !== dragItem.current.id)
          );
          break;
        case "in-progress":
          setInProgressTasks((tasks) =>
            tasks.filter((task) => task.id !== dragItem.current.id)
          );
          break;
        case "completed":
          setCompletedTasks((tasks) =>
            tasks.filter((task) => task.id !== dragItem.current.id)
          );
          break;
      }

      switch (dragOverColumn.current) {
        case "backlog":
          setBacklogTasks((tasks) => [...tasks, dragItem.current]);
          break;
        case "todo":
          setTodoTasks((tasks) => [...tasks, dragItem.current]);
          break;
        case "in-progress":
          setInProgressTasks((tasks) => [...tasks, dragItem.current]);
          break;
        case "completed":
          setCompletedTasks((tasks) => [...tasks, dragItem.current]);
          break;
      }
    }
    setDraggedItem(null);
    setHoverStarted(false);
    setHovered(noHoverState);
  };

  const handleTaskClick = (task) => {
    console.log(task);
  };

  return (
    <>
      <div className="px-20 h-full">
        <div className="p-5 bg-gray-300/20 flex">
          <h1 className="text-lg flex-grow">{board?.name}</h1>
          <button
            className="button bg-yellow-500 font-semibold disabled:invisible"
            onClick={() => openDialog(true)}
            disabled={!Object.keys(board).length}
          >
            Edit Board
          </button>
        </div>
        <div>{board?.description}</div>
        <div className="columns-container">
          <Column
            title="Backlog"
            column="backlog"
            tasks={backlogTasks}
            isHovered={isHovered.backlog}
            hoverStarted={hoverStarted}
            draggedItemId={draggedItemId}
            dragItemStart={handleDragItemStart}
            dragOverCol={(e) => handleDragOverCol(e, "backlog")}
            dragEnter={() => handleDragEnterCol("backlog")}
            dragLeave={() => handleDragLeaveCol("backlog")}
            dropItem={handleDropItem}
            taskClick={handleTaskClick}
            moveTask={moveTask}
          />
          <Column
            title="To Do"
            column="todo"
            tasks={todoTasks}
            isHovered={isHovered.todo}
            draggedItemId={draggedItemId}
            hoverStarted={hoverStarted}
            dragItemStart={handleDragItemStart}
            dragOverCol={(e) => handleDragOverCol(e, "todo")}
            dragEnter={() => handleDragEnterCol("todo")}
            dragLeave={() => handleDragLeaveCol("todo")}
            dropItem={handleDropItem}
            taskClick={handleTaskClick}
            moveTask={moveTask}
          />
          <Column
            title="In Progress"
            column="in-progress"
            tasks={inProgressTasks}
            isHovered={isHovered.inProgress}
            hoverStarted={hoverStarted}
            draggedItemId={draggedItemId}
            dragItemStart={handleDragItemStart}
            dragOverCol={(e) => handleDragOverCol(e, "in-progress")}
            dragEnter={() => handleDragEnterCol("inProgress")}
            dragLeave={() => handleDragLeaveCol("inProgress")}
            dropItem={handleDropItem}
            taskClick={handleTaskClick}
            moveTask={moveTask}
          />
          <Column
            title="Completed"
            column="completed"
            tasks={completedTasks}
            isHovered={isHovered.completed}
            hoverStarted={hoverStarted}
            draggedItemId={draggedItemId}
            dragItemStart={handleDragItemStart}
            dragOverCol={(e) => handleDragOverCol(e, "completed")}
            dragEnter={() => handleDragEnterCol("completed")}
            dragLeave={() => handleDragLeaveCol("completed")}
            dropItem={handleDropItem}
            taskClick={handleTaskClick}
            moveTask={moveTask}
          />
        </div>
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
            onFormSubmit={(payload) => console.log(payload)}
            closeForm={() => openDialog(false)}
            formData={board}
            isEditForm={true}
          />
        </div>
      </Dialog>
    </>
  );
};

export default BoardView;
