import React, { useEffect, useState } from "react";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetails from "../components/NoteDetails";
import BtnActionHapus from "../components/BtnActionHapus";
import BtnActionArsip from "../components/BtnActionArsip";
import LoadingPage from "./LoadingPage";

function DetailsPage() {
  const { id } = useParams();
  const [noteDetail, setNoteDetail] = useState(null);

  const Navigate = useNavigate();

  const onArchiveNoteHandler = async (id) => {
    await archiveNote(id);
    Navigate("/arsip");
  };

  const onUnArchiveNoteHandler = async (id) => {
    await unarchiveNote(id);
    Navigate("/");
  };

  const onDeleteNoteHandler = async (id) => {
    await deleteNote(id);
    Navigate("/");
  };

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNoteDetail(data);
    });
  });

  if (noteDetail === null) {
    return <LoadingPage />;
  }

  return (
    <section className="detail-page">
      <NoteDetails {...noteDetail} />
      <div className="detail-page__action">
        <BtnActionArsip
          onUnArchive={onUnArchiveNoteHandler}
          onArchive={onArchiveNoteHandler}
          id={id}
          note={noteDetail}
        />
        <BtnActionHapus id={id} onDelete={onDeleteNoteHandler} />
      </div>
    </section>
  );
}

export default DetailsPage;
