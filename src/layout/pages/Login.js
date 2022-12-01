import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [label, toggleLabel] = useState({
    username: " invisible ",
    password: " invisible ",
  });

  const INITIAL_PLACEHOLDERS = {
    username: "Username or Email",
    password: "Password",
  };

  const [placeholder, setPlaceholder] = useState(INITIAL_PLACEHOLDERS);
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
        [event.target.name]: INITIAL_PLACEHOLDERS[event.target.name],
      });
      setErrors({ ...errors, [event.target.name]: "This field is required." });
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
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (payload.username && payload.password) {
      navigate("/");
      console.log(payload);
    }
  };

  return (
    <div className="bg-gray-300/50 h-screen flex flex-col justify-center items-center">
      <div className="mb-4 text-center">
        <h1 className="text-3xl">Log in to your account</h1>
        <div>or</div>
        <Link to="/signup" className="text-blue-600 font-semibold">
          Sign up here
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="form-container">
        <div className="mb-1.5">
          <label htmlFor="username" className={"label" + label.username}>
            Username or Email
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
            Password
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
        <button
          disabled={Object.keys(errors).length !== 0}
          className="button w-full enabled:bg-blue-900 text-white font-semibold mt-6 disabled:bg-blue-900/40"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
