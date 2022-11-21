import React, { useContext, useState } from "react";
import BtnActionSimpan from "../components/BtnActionSimpan";
import useInput from "../hooks/useInput";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

const NoteInput = () => {
  const [title, onTitleHandler] = useInput("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  const onBodyHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({ title, body });
    navigate("/");
  };

  return (
    <>
      <div className="add-new-page__input">
        <input
          type="text"
          placeholder={locale === "id" ? "Catatan rahasia" : "Secret notes"}
          className="add-new-page__input__title"
          value={title}
          onChange={onTitleHandler}
        />
        <div
          className="add-new-page__input__body"
          contentEditable
          data-placeholder={
            locale === "id" ? "Sebenarnya saya adalah" : "Actually I am"
          }
          onInput={onBodyHandler}
        ></div>
      </div>
      <BtnActionSimpan onSubmit={onSubmitHandler} />
    </>
  );
};

export default NoteInput;
