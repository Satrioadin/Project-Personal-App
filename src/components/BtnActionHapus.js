import React from "react";
import { FiTrash } from "react-icons/fi";
import PropTypes from "prop-types";

const BtnActionHapus = ({ id, onDelete }) => {
  return (
    <button
      className="action"
      type="button"
      title="hapus"
      onClick={() => onDelete(id, onDelete)}
    >
      <FiTrash />
    </button>
  );
};

BtnActionHapus.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BtnActionHapus;
