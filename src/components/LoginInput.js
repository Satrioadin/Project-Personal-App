import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={onEmailChange}
      />
      <label htmlFor="password">
        {locale === "id" ? "Kata sandi" : "Password"}
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button type="button" onClick={onSubmitHandler}>
        {locale === "id" ? "Masuk" : "Login"}
      </button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
