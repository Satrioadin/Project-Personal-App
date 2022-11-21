import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
  const [name, onNameHandler] = useInput("");
  const [email, onEmailHandler] = useInput("");
  const [password, onPasswordHandler] = useInput("");
  const [confirmPassword, onConfirmPasswordHandler] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Pasword tidak sama");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="input-register">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={onNameHandler}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={onEmailHandler}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onPasswordHandler}
      />
      <label htmlFor="confimPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordHandler}
      />
      <button type="button" onClick={onSubmitHandler}>
        Register
      </button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
