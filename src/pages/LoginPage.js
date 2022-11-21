import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import LocaleContext from "../contexts/LocaleContext";
import { login } from "../utils/api";
import PropTypes from "prop-types";

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Login untuk menggunakan aplikasi"
          : "Login to use the app"}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun?" : "Don't have an account yet?"}

        <Link to={"/register"}>
          {" "}
          {locale === "id" ? "Daftar disini" : "Register here"}
        </Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
