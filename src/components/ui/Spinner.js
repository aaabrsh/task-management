import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div className="spinner flex-col">
      <CircularProgress color="inherit" />
      <h1>Loading</h1>
    </div>
  );
};

export const SmallSpinner = () => {
  return (
    <div className="spinner flex-col">
      <CircularProgress size={20} color="inherit" />
    </div>
  );
};

export default Spinner;
