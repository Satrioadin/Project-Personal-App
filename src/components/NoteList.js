import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

const NoteList = ({ notes }) => {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem {...note} key={note.id} />
      ))}
    </section>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
