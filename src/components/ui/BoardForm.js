import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBoard, editBoard } from "../../reducers/boardSlice";
import { SmallSpinner } from "./Spinner";

function BoardForm({ formData, isEditForm, closeForm, board_id }) {
  const [label, toggleLabel] = useState({
    name: " invisible ",
    description: " invisible ",
  });

  const placeholderTexts = {
    name: "Board Name",
    description: "Description",
  };

  const [placeholder, setPlaceholder] = useState(placeholderTexts);
  const [errors, setErrors] = useState({});
  const [form, setFormData] = useState({ name: "", description: "" });
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formData) {
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
      if (event.target.name === "name")
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
    };

    if (handleValidation("name", form.name)) {
      //if name is valid. (we have no other validation to do)
      setSpinner(true);
      if (!board_id) {
        //if add form
        dispatch(addNewBoard(payload)).then((res) => {
          setSpinner(false);
          if (res) {
            closeForm(null);
          }
        });
      } else {
        dispatch(editBoard(board_id, payload)).then((res) => {
          setSpinner(false);
          if (res) {
            closeForm({_id: board_id, ...payload});//the parameter is used to update active board
          }
        });
      }
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
      <div className="mt-6 flex justify-end">
        {isEditForm && (
          <input
            type={"reset"}
            value="Cancel"
            className="cursor-pointer button w-20 enabled:bg-yellow-500 text-black font-semibold mr-3"
          />
        )}
        <div className="relative">
          {spinner && <SmallSpinner />}
          <button
            disabled={Object.keys(errors).length !== 0 || spinner}
            className="button w-20 enabled:bg-teal-900 text-white font-semibold disabled:bg-teal-900/40"
          >
            {isEditForm ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default BoardForm;
