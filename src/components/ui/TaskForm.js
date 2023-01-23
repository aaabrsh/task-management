import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import { priorityIcon } from "../../utils/priorityIcon";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../../reducers/taskSlice";

const TaskForm = ({ formData, closeForm }) => {
  const [label, toggleLabel] = useState({
    name: " invisible ",
    description: " invisible ",
  });

  const placeholderTexts = {
    name: "Board Name",
    description: "Description",
    priority: "Priority",
    deadline: "Deadline",
  };

  const [placeholder, setPlaceholder] = useState(placeholderTexts);
  const [errors, setErrors] = useState({});
  const [form, setFormData] = useState({
    name: "",
    description: "",
    priority: "medium",
    deadline: "",
  });

  const dispatch = useDispatch();
  const board = useSelector((state) => state.active_board);

  useEffect(() => {
    if (formData) {
      //if the form is being used as an edit form
      setFormData({ ...formData });
    }
  }, [formData]);

  const handleFocus = (event) => {
    toggleLabel({ ...label, [event.target.name]: " visible " });
    setPlaceholder({ ...placeholder, [event.target.name]: "" });
  };

  const handleBlurred = (event) => {
    if (event.target.value == "") {
      toggleLabel({ ...label, [event.target.name]: " invisible " });
      setPlaceholder({
        ...placeholder,
        [event.target.name]: placeholderTexts[event.target.name],
      });
      handleValidation(event.target.name, event.target.value);
      return;
    }
  };

  const handleValidation = (target, value) => {
    switch (target) {
      case "name":
        if (value == "") {
          setErrors({ ...errors, [target]: "This field is required." });
          return false;
        } else if (errors[target]) {
          removeError(target);
        }
        return true;
      default:
        if (errors[target]) {
          removeError(target);
        }
        return true;
    }
  };

  const removeError = (target) => {
    let tempErr = { ...errors };
    delete tempErr[target];
    setErrors({ ...tempErr });
  };

  const handleChange = (event) => {
    handleValidation(event.target.name, event.target.value);
    setFormData({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      deadline: formData.get("deadline"),
    };

    if (handleValidation("name", form.name)) {
      //if name is valid. (we have no other validation to do)
      const board_id = board._id;
      dispatch(
        addNewTask(board_id, { ...payload, task_id: Math.floor(Math.random() * 10000) })
      ).then((res) => {
        if (res.success) {
          setErrors({ ...res.message });
        }else{
          closeForm()
        }
      });
    }
  };

  return (
    <form onSubmit={onSubmit} onReset={closeForm}>
      <div className="mb-1.5">
        <label htmlFor="name" className={"label text-teal-900" + label.name}>
          {placeholderTexts.name}
        </label>
        <input
          onFocus={handleFocus}
          onBlur={handleBlurred}
          onChange={handleChange}
          value={form.name}
          type="text"
          name="name"
          placeholder={placeholder.name}
          className="input focus:border-teal-600"
        />
        {errors.name && <small className="error-message">{errors.name}</small>}
      </div>
      <div className="mb-1.5">
        <label
          htmlFor="description"
          className={"label text-teal-900" + label.description}
        >
          {placeholderTexts.description}
        </label>
        <textarea
          onFocus={handleFocus}
          onBlur={handleBlurred}
          onChange={handleChange}
          value={form.description}
          rows={8}
          type="text"
          name="description"
          placeholder={placeholder.description}
          className="input bg-gray-100 p-2 focus:border-teal-600"
        />
        {errors.description && (
          <small className="error-message">{errors.description}</small>
        )}
      </div>
      <div className="flex gap-10 items-center">
        <div className="block w-full mb-1.5 mt-3">
          <label htmlFor="priority" className="label text-teal-900">
            {placeholderTexts.priority}
          </label>
          <div className="flex items-center">
            <FormControl
              variant="standard"
              className="block w-full focus:bg-white"
            >
              <Select
                className="input dropdown-input"
                value={form.priority}
                name="priority"
                onChange={handleChange}
              >
                <MenuItem className="dropdown-option" value="low">
                  Low
                </MenuItem>
                <MenuItem className="dropdown-option" value="medium">
                  Medium
                </MenuItem>
                <MenuItem className="dropdown-option" value="high">
                  High
                </MenuItem>
              </Select>
            </FormControl>
            <div className="p-1 ml-1 border rounded-3xl border-gray-300">
              {priorityIcon(form.priority)}
            </div>
          </div>
          {errors.priority && (
            <small className="error-message">{errors.priority}</small>
          )}
        </div>
        <div className="block w-full mb-1.5 mt-3">
          <label htmlFor="deadline" className="label text-teal-900">
            {placeholderTexts.deadline}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlurred}
            onChange={handleChange}
            value={form.deadline}
            type={"date"}
            name="deadline"
            placeholder={placeholder.deadline}
            className="input focus:border-teal-600"
          />
          {errors.deadline && (
            <small className="error-message">{errors.deadline}</small>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <input
          type={"reset"}
          value="Cancel"
          className="cursor-pointer button w-20 enabled:bg-yellow-500 text-black font-semibold mr-3"
        />
        <input
          type={"submit"}
          value="Save"
          disabled={Object.keys(errors).length !== 0}
          className="cursor-pointer button w-20 enabled:bg-teal-900 text-white font-semibold disabled:bg-teal-900/40"
        />
      </div>
    </form>
  );
};

export default TaskForm;
