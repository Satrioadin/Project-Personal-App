import React from "react";
import { FiArchive, FiInbox } from "react-icons/fi";
import PropTypes from "prop-types";

const BtnActionArsip = ({ note, onArchive, onUnArchive, id }) => {
  return (
    <>
      {note.archived ? (
        <button
          className="action"
          type="button"
          title="un arsip"
          onClick={() => onUnArchive(id)}
        >
          <FiInbox />
        </button>
      ) : (
        <button
          className="action"
          type="button"
          title="arsip"
          onClick={() => onArchive(id)}
        >
          <FiArchive />
        </button>
      )}
    </>
  );
};
BtnActionArsip.propTypes = {
  id: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  onUnArchive: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default BtnActionArsip;
