import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BoardView from "../../components/containers/BoardView";
import TasksList from "../../components/containers/TasksList";
import { Link, useParams } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../../reducers/taskSlice";
import { fetchBoard } from "../../reducers/activeBoardSlice";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => state.active_board);
  const tasks = useSelector((state) => state.tasks);
  const [value, setValue] = useState("1");

  useEffect(() => {
    dispatch(fetchAllTasks({ id: id }));
    dispatch(fetchBoard(id));
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
          <BoardView board={board} tasks={tasks} />
        </TabPanel>
        <TabPanel value="2">
          <TasksList board={board} tasks={tasks} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Board;
