import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BtnActionTambah from "../components/BtnActionTambah";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/api";
import LoadingPage from "./LoadingPage";

function HomePage() {
  const [notesActive, setNotesActive] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotesActive(data);
    });
  }, []);

  const onKeywordHandler = async (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  if (notesActive === null) {
    return <LoadingPage />;
  }

  const filteredNotesActive = notesActive.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordHandler} />
      {notesActive.length > 0 ? (
        <NoteList notes={filteredNotesActive} />
      ) : (
        <p className="not-found-content">
          {locale === "id" ? "Tidak ada catatan" : "No note..."}
        </p>
      )}
      <BtnActionTambah />
    </section>
  );
}

export default HomePage;
