import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BoardView from "../../components/containers/BoardView";
import TasksList from "../../components/containers/TasksList";
import { Link, useParams } from "react-router-dom";
import { tasks as tasksList } from "../../temp/tasks";
import { boards } from "../../temp/boards";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useSelector } from "react-redux";

const Board = (props) => {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("1");
  const currentBoard = useSelector(state => state.boards).find((borad) => borad.id == id);

  useEffect(() => {
    if (currentBoard) {
      //if a board with the given id is found
      setBoard({ ...currentBoard });
      const currentTasks = tasksList.filter((task) => task.board_id == id);
      setTasks([...currentTasks]);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMoveTask = (id, destination) => {
    const tempTasks = [...tasks];
    const task = tempTasks.find((t) => t.id === id);
    const index = tempTasks.indexOf(task);
    tempTasks[index] = { ...tempTasks[index], status: destination };
    //TODO change the task status at the api not here
    setTasks(tempTasks);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="px-24 bg-yellow-900/20 flex items-center"
        >
          <Link
            to="/boards"
            className="p-3 text-blue-500 hover:text-red-400"
            title="back"
          >
            <ArrowCircleLeftOutlinedIcon className="" />
          </Link>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab
              label="Board View"
              value="1"
              style={{ fontSize: "12px", fontWeight: "600" }}
            />
            <Tab
              label="All Tasks"
              value="2"
              style={{ fontSize: "12px", fontWeight: "600" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BoardView board={board} tasks={tasks} moveTask={handleMoveTask} />
        </TabPanel>
        <TabPanel value="2">
          <TasksList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Board;
