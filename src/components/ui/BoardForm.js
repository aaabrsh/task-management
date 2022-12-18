import React, { useEffect, useState } from "react";

function BoardForm({ onFormSubmit, formData, isEditForm, closeForm }) {
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

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
    };
    if (!payload.name.length) {
      setErrors({ ...errors, name: "This field is required." });
    }

    if (payload.name) {
      onFormSubmit(payload);
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
          // <button onClick={closeForm} className="button w-20 enabled:bg-yellow-500 text-black font-semibold mr-3">
          //   Cancel
          // </button>
          <input
            type={"reset"}
            value="Cancel"
            className="button w-20 enabled:bg-yellow-500 text-black font-semibold mr-3"
          />
        )}
        <button
          disabled={Object.keys(errors).length !== 0}
          className="button w-20 enabled:bg-teal-900 text-white font-semibold disabled:bg-teal-900/40"
        >
          {isEditForm ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default BoardForm;
