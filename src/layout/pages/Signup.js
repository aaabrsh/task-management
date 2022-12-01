import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const [label, toggleLabel] = useState({
    first_name: " invisible ",
    last_name: " invisible ",
    email: " invisible ",
    username: " invisible ",
    password: " invisible ",
    confirm_password: " invisible ",
  });

  const placeholderTexts = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    username: "Username",
    password: "Password",
    confirm_password: "Confirm Password",
  };

  const [placeholder, setPlaceholder] = useState(placeholderTexts);
  const [errors, setErrors] = useState({});

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
      setErrors({ ...errors, [event.target.name]: "This field is required." });
      return;
    }
  };

  const handleValidation = (event) => {
    if (event.target.value == "") {
      setErrors({ ...errors, [event.target.name]: "This field is required." });
    } else if (
      event.target.name == "password" &&
      event.target.value.length < 8
    ) {
      setErrors({
        ...errors,
        [event.target.name]: "Password should be at least 8 characters long.",
      });
    } else if (
      event.target.name == "email" &&
      event.target.value.length !== 0 &&
      event.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9]/
      ) == null
    ) {
      setErrors({ ...errors, [event.target.name]: "Wrong email format." });
    } else {
      let tempErr = { ...errors };
      delete tempErr[event.target.name];
      setErrors({ ...tempErr });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      // confirm_password: formData.get("confirm_password"),
    };

    if (payload.confirm_password != payload.password) {
      setErrors({ ...errors, confirm_password: "Passwords do not match." });
      return;
    }

    if (payload.username && payload.password) {
      navigate("/");
      console.log(payload);
    }
  };

  return (
    <div className="bg-gray-300/50 h-screen flex flex-col justify-center items-center">
      <div className="mb-4 text-center">
        <h1 className="text-3xl">Sign up for a new account</h1>
        <div>or</div>
        <Link to="/login" className="text-blue-600 font-semibold">
          already have an account?
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="form-container h-fit">
        <div className="mb-1.5 grid grid-cols-2 gap-1">
          <div className="mr-2">
            <label htmlFor="first_name" className={"label" + label.first_name}>
              {placeholderTexts.first_name}
            </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlurred}
              onChange={handleValidation}
              type="text"
              name="first_name"
              placeholder={placeholder.first_name}
              className="input"
            />
            {errors.first_name && (
              <small className="error-message">{errors.first_name}</small>
            )}
          </div>
          <div>
            <label htmlFor="last_name" className={"label" + label.last_name}>
              {placeholderTexts.last_name}
            </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlurred}
              onChange={handleValidation}
              type="text"
              name="last_name"
              placeholder={placeholder.last_name}
              className="input"
            />
            {errors.last_name && (
              <small className="error-message">{errors.last_name}</small>
            )}
          </div>
        </div>
        <div className="mb-1.5">
          <label htmlFor="email" className={"label" + label.email}>
            {placeholderTexts.email}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlurred}
            onChange={handleValidation}
            type="text"
            name="email"
            placeholder={placeholder.email}
            className="input"
          />
          {errors.email && (
            <small className="error-message">{errors.email}</small>
          )}
        </div>
        <div className="mb-1.5">
          <label htmlFor="username" className={"label" + label.username}>
            {placeholderTexts.username}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlurred}
            onChange={handleValidation}
            type="text"
            name="username"
            placeholder={placeholder.username}
            className="input"
          />
          {errors.username && (
            <small className="error-message">{errors.username}</small>
          )}
        </div>
        <div className="mb-1.5">
          <label htmlFor="username" className={"label" + label.password}>
            {placeholderTexts.password}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlurred}
            onChange={handleValidation}
            type="password"
            name="password"
            placeholder={placeholder.password}
            className="input"
          />
          {errors.password && (
            <small className="error-message">{errors.password}</small>
          )}
        </div>
        <div className="mb-1.5">
          <label
            htmlFor="confirm_password"
            className={"label" + label.confirm_password}
          >
            {placeholderTexts.confirm_password}
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlurred}
            onChange={handleValidation}
            type="password"
            name="confirm_password"
            placeholder={placeholder.confirm_password}
            className="input"
          />
          {errors.confirm_password && (
            <small className="error-message">{errors.confirm_password}</small>
          )}
        </div>
        <button
          disabled={Object.keys(errors).length !== 0}
          className="button w-full enabled:bg-blue-900 text-white font-semibold mt-6 disabled:bg-blue-900/40"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
