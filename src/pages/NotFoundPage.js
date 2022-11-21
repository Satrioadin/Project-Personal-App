import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const NotFoundPage = () => {
  const { locale } = useContext(LocaleContext);
  return (
    <section className="not-found-content">
      <div>
        <h2>{locale === "id" ? "Page Tidak Ditemukan" : "Page Not Found"}</h2>
      </div>
    </section>
  );
};

export default NotFoundPage;
