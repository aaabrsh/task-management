import { Dialog } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveBoard } from "../../reducers/activeBoardSlice";
import { editTask } from "../../reducers/taskSlice";
import BoardForm from "../ui/BoardForm";
import Column from "../ui/Column";
import Spinner from "../ui/Spinner";
import TaskForm from "../ui/TaskForm";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const BoardView = ({
  board,
  tasks,
  tasksSpinner,
  boardsSpinner,
  setLoading,
}) => {
  const noHoverState = {
    backlog: false,
    todo: false,
    inProgress: false,
    completed: false,
  };
  const [boardDialog, openBoardDialog] = useState(false);
  const [taskDialog, openTaskDialog] = useState(false);
  const [taskEdit, setTaskEdit] = useState(false);
  const [isHovered, setHovered] = useState(noHoverState);
  const [hoverStarted, setHoverStarted] = useState(false);
  const [draggedItemId, setDraggedItem] = useState(null);
  const dragItem = useRef();
  const dragOverColumn = useRef();
  const dragFromColumn = useRef();
  const dispatch = useDispatch();

  const handleDragItemStart = (event, id, column) => {
    setHoverStarted(true);
    dragItem.current = tasks.find((task) => task._id === id);
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
      setLoading(true);
      dispatch(
        editTask(dragItem.current._id, { status: dragOverColumn.current })
      ).then(() => setLoading(false));
    }
    setDraggedItem(null);
    setHoverStarted(false);
    setHovered(noHoverState);
  };

  const handleTaskClick = (task) => {
    openTaskDialog(true);
    setTaskEdit({ ...task });
  };

  const getBoardDialog = (
    <Dialog
      open={boardDialog}
      onClose={() => openBoardDialog(false)}
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
          closeForm={(payload) => {
            if (Object.keys(payload)[0] === "_id") {
              //if active board needs to be updated after editing
              dispatch(setActiveBoard(payload));
            }
            openBoardDialog(false);
          }}
          formData={board}
          board_id={board._id}
          isEditForm={true}
        />
      </div>
    </Dialog>
  );

  const getTaskDialog = (
    <Dialog
      open={taskDialog}
      onClose={() => openTaskDialog(false)}
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
        <h1 className="text-3xl text-teal-900">{taskEdit ? "Edit Task" : "Add Task"}</h1>
        <TaskForm formData={taskEdit} closeForm={() => openTaskDialog(false)} />
      </div>
    </Dialog>
  );

  return (
    <>
      <div className="px-20 h-full">
        <div className="relative">
          {boardsSpinner && <Spinner />}
          <div className="p-5 bg-gray-300/30 flex">
            <h1 className="text-lg flex-grow flex items-center">
              {board?.name}
            </h1>
            &nbsp;&nbsp;
            <button
              title="edit board"
              className="disabled:invisible"
              onClick={() => openBoardDialog(true)}
              disabled={!Object.keys(board).length}
            >
              <EditIcon fontSize="small" className="text-cyan-500" />
            </button>
          </div>
          <div>{board?.description}</div>
        </div>

        <div className="relative w-fit">
          {tasksSpinner && <Spinner />}
          <div
            className="cursor-pointer flex justify-center items-center mt-3 p-2 bg-gray-300/30 text-black hover:bg-gray-300"
            onClick={() => {
              setTaskEdit(undefined);
              openTaskDialog(true);
            }}
          >
            <span className="pr-1 font-semibold">Create Task</span>
            <AddIcon />
          </div>
          <div className="columns-container">
            <Column
              title="Backlog"
              column="backlog"
              tasks={tasks.filter((task) => task.status == "backlog")}
              isHovered={isHovered.backlog}
              hoverStarted={hoverStarted}
              draggedItemId={draggedItemId}
              dragItemStart={handleDragItemStart}
              dragOverCol={(e) => handleDragOverCol(e, "backlog")}
              dragEnter={() => handleDragEnterCol("backlog")}
              dragLeave={() => handleDragLeaveCol("backlog")}
              dragEnd={handleDropItem} //incase the item was dropped out of any column
              dropItem={handleDropItem}
              taskClick={handleTaskClick}
              setLoading={setLoading}
            />
            <Column
              title="To Do"
              column="todo"
              tasks={tasks.filter((task) => task.status == "todo")}
              isHovered={isHovered.todo}
              draggedItemId={draggedItemId}
              hoverStarted={hoverStarted}
              dragItemStart={handleDragItemStart}
              dragOverCol={(e) => handleDragOverCol(e, "todo")}
              dragEnter={() => handleDragEnterCol("todo")}
              dragLeave={() => handleDragLeaveCol("todo")}
              dragEnd={handleDropItem} //incase the item was dropped out of any column
              dropItem={handleDropItem}
              taskClick={handleTaskClick}
              setLoading={setLoading}
            />
            <Column
              title="In Progress"
              column="in-progress"
              tasks={tasks.filter((task) => task.status == "in-progress")}
              isHovered={isHovered.inProgress}
              hoverStarted={hoverStarted}
              draggedItemId={draggedItemId}
              dragItemStart={handleDragItemStart}
              dragOverCol={(e) => handleDragOverCol(e, "in-progress")}
              dragEnter={() => handleDragEnterCol("inProgress")}
              dragLeave={() => handleDragLeaveCol("inProgress")}
              dragEnd={handleDropItem} //incase the item was dropped out of any column
              dropItem={handleDropItem}
              taskClick={handleTaskClick}
              setLoading={setLoading}
            />
            <Column
              title="Completed"
              column="completed"
              tasks={tasks.filter((task) => task.status == "completed")}
              isHovered={isHovered.completed}
              hoverStarted={hoverStarted}
              draggedItemId={draggedItemId}
              dragItemStart={handleDragItemStart}
              dragOverCol={(e) => handleDragOverCol(e, "completed")}
              dragEnter={() => handleDragEnterCol("completed")}
              dragLeave={() => handleDragLeaveCol("completed")}
              dragEnd={handleDropItem} //incase the item was dropped out of any column
              dropItem={handleDropItem}
              taskClick={handleTaskClick}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
      {getBoardDialog}
      {getTaskDialog}
    </>
  );
};

export default BoardView;
