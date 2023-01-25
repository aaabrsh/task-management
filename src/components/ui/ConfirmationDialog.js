import { Dialog } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmationDialog = ({ status, id, closeDialog, type, confirmed }) => {
  return (
    <Dialog
      open={status}
      onClose={closeDialog}
      fullWidth={true}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "400px",
          maxHeight: "auto",
        },
      }}
    >
      <div className="p-5">
        <p className="text-base mb-5">
          Are you sure you want to permanently delete this {type}?
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => confirmed(id)}
            className="button flex justify-center items-center bg-green-500 text-white w-[90px] mr-3"
          >
            <CheckIcon />
            &nbsp; <span>Yes</span>
          </button>
          <button
            onClick={closeDialog}
            className="button flex justify-center items-center bg-red-500 text-white w-[90px]"
          >
            <CloseIcon />
            &nbsp; <span>No</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
