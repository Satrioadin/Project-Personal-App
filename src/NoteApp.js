import React, { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import DetailsPageWrapper from "./pages/DetailsPage";
import Navigation from "./components/Navigation";
import ArsipPage from "./pages/ArsipPage";
import AddPageWrapper from "./pages/AddPage";
import HomePage from "./pages/HomePage";
import { getUserLogged, putAccessToken } from "./utils/api";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import { LocaleProvider } from "./contexts/LocaleContext";
import { MdGTranslate } from "react-icons/md";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";

const NoteApp = () => {
  const [authedUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  const contextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme,
    };
  }, [locale, theme]);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthUser(data);
  }

  async function onLogout() {
    setAuthUser(null);
    putAccessToken("");
  }

  useEffect(() => {
    const userLogin = async () => {
      const { data } = await getUserLogged();
      setAuthUser(data);
      setInitializing(false);
    };

    userLogin().catch(console.error);

    return () => {
      setAuthUser(null);
      setInitializing(true);
    };
  }, []);

  useEffect(
    (prevState) => {
      if (prevState !== theme) {
        document.documentElement.setAttribute("data-theme", theme);
      }
    },
    [theme]
  );

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleProvider value={contextValue}>
        <div className="app-container">
          <header>
            <h1>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</h1>
            <button
              type="button"
              className="toggle-locale"
              onClick={toggleLocale}
            >
              <MdGTranslate />
            </button>
            <button
              type="button"
              className="toggle-theme"
              onClick={toggleTheme}
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </header>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }

  return (
    <LocaleProvider value={contextValue}>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">
              {contextValue.locale === "id" ? "Aplikasi Catatan" : "Notes App"}
            </Link>
          </h1>
          <Navigation />
          <button
            type="button"
            className="toggle-locale"
            onClick={toggleLocale}
          >
            <MdGTranslate />
          </button>
          <button type="button" className="toggle-theme" onClick={toggleTheme}>
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
          <button className="button-logout" onClick={onLogout}>
            <FiLogOut />
            {authedUser.name}
          </button>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/arsip" element={<ArsipPage />} />
            <Route path="/details/:id" element={<DetailsPageWrapper />} />
            <Route path="/add" element={<AddPageWrapper />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </LocaleProvider>
  );
};

export default NoteApp;
