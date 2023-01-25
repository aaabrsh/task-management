import { CircularProgress } from "@mui/material";

const Spinner = (props) => {
  return (
    <div className="spinner flex-col">
      <CircularProgress color="inherit" />
      <h1>Loading</h1>
    </div>
  );
};

export default Spinner;
