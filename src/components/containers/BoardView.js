import { Dialog } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { tasks as tasksList } from "../../temp/tasks";
import { boards } from "../../temp/boards";
import BoardForm from "../ui/BoardForm";
import Column from "../ui/Column";
import { useParams } from "react-router-dom";

const BoardView = (props) => {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [open, openDialog] = useState(false);
  const dragItem = useRef();
  const dragOverColumn = useRef();
  const dragFromColumn = useRef();

  useEffect(() => {
    setTasks([...tasksList]);
    const currentBoard = boards.find((borad) => borad.id == id);
    setBoard({ ...currentBoard });
  }, []);

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

  const handleDragStart = (event, id, column) => {
    dragItem.current = tasks.find((task) => task.id === id);
    dragFromColumn.current = column;
  };
  const handleDragEnter = (event, column) => {
    switch (column) {
      case "backlog":
        dragOverColumn.current = "backlog";
        break;
      case "todo":
        dragOverColumn.current = "todo";
        break;
      case "in-progress":
        dragOverColumn.current = "in-progress";
        break;
      case "completed":
        dragOverColumn.current = "completed";
        break;
    }
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
            dragStart={handleDragStart}
            dragEnter={(e) => handleDragEnter(e, "backlog")}
            dropItem={handleDropItem}
          />
          <Column
            title="To Do"
            column="todo"
            tasks={todoTasks}
            dragStart={handleDragStart}
            dragEnter={(e) => handleDragEnter(e, "todo")}
            dropItem={handleDropItem}
          />
          <Column
            title="In Progress"
            column="in-progress"
            tasks={inProgressTasks}
            dragStart={handleDragStart}
            dragEnter={(e) => handleDragEnter(e, "in-progress")}
            dropItem={handleDropItem}
          />
          <Column
            title="Completed"
            column="completed"
            tasks={completedTasks}
            dragStart={handleDragStart}
            dragEnter={(e) => handleDragEnter(e, "completed")}
            dropItem={handleDropItem}
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
