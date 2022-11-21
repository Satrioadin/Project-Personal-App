import React from "react";
import { FiCheck } from "react-icons/fi";
import PropsTypes from "prop-types";

const BtnActionSimpan = ({ onSubmit }) => {
  return (
    <div className="add-new-page__action" onClick={onSubmit}>
      <button type="button" title="simpan" className="action">
        <FiCheck></FiCheck>
      </button>
    </div>
  );
};

BtnActionSimpan.propTypes = {
  onSubmit: PropsTypes.func.isRequired,
};

export default BtnActionSimpan;
