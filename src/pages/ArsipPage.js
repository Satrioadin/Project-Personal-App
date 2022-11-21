import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";
import { getArchivedNotes } from "../utils/api";
import LoadingPage from "./LoadingPage";
import BtnActionTambah from "../components/BtnActionTambah";

function ArsipPage() {
  const [notesArchived, setNotesArchived] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotesArchived(data);
    });
  }, []);

  const onKeywordHandler = async (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  if (notesArchived === null) {
    return <LoadingPage />;
  }

  const filteredNotesArchived = notesArchived.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archives-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archive Notes"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordHandler} />
      {notesArchived.length > 0 ? (
        <NoteList notes={filteredNotesArchived} />
      ) : (
        <p className="not-found-content">
          {locale === "id" ? "Tidak ada catatan arship" : "No archive records"}
        </p>
      )}
      <BtnActionTambah />
    </section>
  );
}

export default ArsipPage;
