import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { priorityIcon } from "../../utils/priorityIcon";
import TaskForm from "../ui/TaskForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../reducers/taskSlice";
import Spinner from "../ui/spinner";

const TasksList = ({ board, tasks, tasksSpinner }) => {
  const [open, openDialog] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    setSpinner(tasksSpinner);
  }, [tasksSpinner]);

  const noTasks = (
    <div className="font-bold text-center text-gray-400 text-2xl py-[100px]">
      There are no Tasks!
    </div>
  );

  const dialog = (
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
        <h1 className="text-3xl text-teal-900">Add Task</h1>
        <TaskForm
          formData={formData ? formData : undefined}
          closeForm={() => openDialog(false)}
        />
      </div>
    </Dialog>
  );

  return (
    <div>
      <div className="px-20 h-full">
        <div className="tasks-table-container">
          <h1 className="text-lg py-3 text-center">{board?.name}</h1>
          <div className="relative">
            {spinner && <Spinner />}
            <div
              className="cursor-pointer flex justify-center items-center p-2 bg-transparent text-black border"
              onClick={() => {
                setFormData(undefined);
                openDialog(true);
              }}
            >
              <span className="pr-1 font-semibold">Create Task</span>
              <AddIcon />
            </div>
            {tasks.length === 0 ? noTasks : tasksTable()}
          </div>
        </div>
      </div>
      {dialog}
    </div>
  );

  function tasksTable() {
    return (
      <table className="tasks-table">
        <thead className="table-head">
          <tr>
            <th>Task Name</th>
            <th>ID</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="task-row">
              <td>{task.name}</td>
              <td>{task.task_id}</td>
              <td title={task.priority}>{priorityIcon(task.priority)}</td>
              <td>{task.status}</td>
              <td>{task.deadline}</td>
              <td>
                <button className="text-blue-400 cursor-pointer" title="edit">
                  <EditIcon
                    onClick={() => {
                      setFormData({ ...task });
                      openDialog(true);
                    }}
                  />
                </button>
                <button className="text-red-500 cursor-pointer" title="delete">
                  <DeleteForeverIcon
                    onClick={() => {
                      setSpinner(true);
                      dispatch(deleteTask(task._id)).then(() =>
                        setSpinner(false)
                      );
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default TasksList;
