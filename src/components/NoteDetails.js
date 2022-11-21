import React from "react";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

const NoteDetails = (note) => {
  return (
    <>
      <h3 className="detail-page__title">
        {note.title}{" "}
        <p style={{ fontSize: "15px" }}>
          {note.archived ? " (Archived)" : " (Not Archived)"}
        </p>
      </h3>

      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <div className="detail-page__body">{note.body}</div>
    </>
  );
};

NoteDetails.propType = {
  note: PropTypes.object.isRequired,
};

export default NoteDetails;
