import AddIcon from "@mui/icons-material/Add";
import { priorityIcon } from "../../utils/priorityIcon";

const TasksList = ({ board, tasks }) => {
  const noTasks = (
    <div className="font-bold text-center text-gray-400 text-2xl py-[100px]">
      There are no Tasks!
    </div>
  );
  return <>{tasks.length === 0 ? noTasks : listTasks(board, tasks)}</>;
};

function listTasks(board, tasks) {
  return (
    <div className="px-20 h-full">
      <div class="tasks-table-container">
        <h1 className="text-lg py-3 text-center">{board?.name}</h1>
        <div className="cursor-pointer flex justify-center items-center p-2 bg-transparent text-black border">
          <span className="pr-1 font-semibold">Create Task</span> <AddIcon />
        </div>
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
              <tr key={task.id} class="task-row">
                <td>{task.name}</td>
                <td>{task.id}</td>
                <td title={task.priority}>{priorityIcon(task.priority)}</td>
                <td>{task.status}</td>
                <td>{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksList;
