import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export const priorityIcon = (priority) => {
    switch (priority) {
      case "low":
        return <HorizontalRuleIcon sx={{ color: "limegreen" }} />;
      case "medium":
        return <KeyboardCapslockIcon sx={{ color: "orange" }} />;
      case "high":
        return <KeyboardDoubleArrowUpIcon sx={{ color: "red" }} />;
    }
  };