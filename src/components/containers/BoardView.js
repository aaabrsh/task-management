import { useEffect, useRef, useState } from "react";
import { tasks as tasksList } from "../../temp/tasks";
import Column from "../ui/Column";

const BoardView = (props) => {
  const [tasks, setTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    setTasks([...tasksList]);
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
    })
    setBacklogTasks([...temp_backlogTasks]);
    setTodoTasks([...temp_todoTasks]);
    setInProgressTasks([...temp_inProgressTasks]);
    setCompletedTasks([...temp_completedTasks]);

  }, [tasks])

  return (
    <div className="px-20 h-full">
      <h1 className="p-5 bg-gray-300/20 text-lg">Board Name</h1>
      <div className="columns-container">
        <Column title="Backlog" tasks={backlogTasks} />
        <Column title="To Do" tasks={todoTasks} />
        <Column title="In Progress" tasks={inProgressTasks} />
        <Column title="Completed" tasks={completedTasks} />
      </div>
    </div>
  );
};

export default BoardView;
