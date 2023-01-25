import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { priorityIcon } from "../../utils/priorityIcon";
import TaskForm from "../ui/TaskForm";

const TasksList = ({ board, tasks }) => {
  const [open, openDialog] = useState(false);
  const [formData, setFormData] = useState(undefined);

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
          <div
            className="cursor-pointer flex justify-center items-center p-2 bg-transparent text-black border"
            onClick={() => {
              setFormData(undefined);
              openDialog(true);
            }}
          >
            <span className="pr-1 font-semibold">Create Task</span> <AddIcon />
          </div>
          {tasks.length === 0 ? noTasks : tasksTable()}
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
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="task-row"
              onClick={() => {
                setFormData({ ...task });
                openDialog(true);
              }}
            >
              <td>{task.name}</td>
              <td>{task.task_id}</td>
              <td title={task.priority}>{priorityIcon(task.priority)}</td>
              <td>{task.status}</td>
              <td>{task.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default TasksList;
