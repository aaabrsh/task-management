import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBoard = ({ formData }) => {
  const navigate = useNavigate();

  const [label, toggleLabel] = useState({
    board_name: " invisible ",
    description: " invisible ",
  });

  const placeholderTexts = {
    board_name: "Board Name",
    description: "Description",
  };

  const [placeholder, setPlaceholder] = useState(placeholderTexts);
  const [errors, setErrors] = useState({});
  const [form, setFormData] = useState(
    formData ? { ...formData } : { board_name: "", description: "" }
  );

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
      if (event.target.name === "board_name")
        setErrors({
          ...errors,
          [event.target.name]: "This field is required.",
        });
      return;
    }
  };

  const handleValidation = (target_name) => {
    if (target_name == "") {
      setErrors({ ...errors, [target_name]: "This field is required." });
    } else {
      let tempErr = { ...errors };
      delete tempErr[target_name];
      setErrors({ ...tempErr });
    }
  };

  const handleChange = (event) => {
    handleValidation(event.target.name);
    setFormData({ ...form, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      board_name: formData.get("board_name"),
      description: formData.get("description"),
    };
    if (!payload.board_name.length) {
      setErrors({ ...errors, board_name: "This field is required." });
    }

    if (payload.board_name) {
      navigate("/boards");
      console.log(payload);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div>
        <div className="w-fit mb-4 text-left">
          <h1 className="text-3xl text-teal-900">Create a New Board</h1>
        </div>
        <div className="flex border rounded-lg rounded-r-none border-teal-900 overflow-auto">
          <form
            onSubmit={handleFormSubmit}
            className="px-10 py-8 bg-white w-[800px]"
          >
            <div className="mb-1.5">
              <label
                htmlFor="board_name"
                className={"label text-teal-900" + label.board_name}
              >
                {placeholderTexts.board_name}
              </label>
              <input
                onFocus={handleFocus}
                onBlur={handleBlurred}
                onChange={handleChange}
                value={form.board_name}
                type="text"
                name="board_name"
                placeholder={placeholder.board_name}
                className="input focus:border-teal-600"
              />
              {errors.board_name && (
                <small className="error-message">{errors.board_name}</small>
              )}
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
                rows={14}
                type="text"
                name="description"
                placeholder={placeholder.description}
                className="input bg-gray-100 p-2 focus:border-teal-600"
              />
              {errors.description && (
                <small className="error-message">{errors.description}</small>
              )}
            </div>
            <button
              disabled={Object.keys(errors).length !== 0}
              className="button float-right enabled:bg-teal-900 text-white font-semibold mt-6 disabled:bg-teal-900/40"
            >
              Create
            </button>
          </form>
          <div className="bg-teal-900 w-1/5"></div>
        </div>
      </div>
    </div>
  );
};

export default NewBoard;
