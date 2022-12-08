import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BoardView from "../../components/containers/BoardView";
import TasksList from "../../components/containers/TasksList";

const Board = (props) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="px-24 bg-yellow-900/20"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
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
          <BoardView />
        </TabPanel>
        <TabPanel value="2">
          <TasksList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Board;
