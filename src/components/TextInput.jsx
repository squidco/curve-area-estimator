import React from "react";
import PropTypes from "prop-types";

export default function TextInput({ id, label, placeholder }) {
  return (
    <div className="text-input-group ease-in-out transition-all relative p-2 m-2">
      <label className="block absolute -start-1 -top-2 transition-all">{label}</label>
      <input
        className="block text-base bg-black border-b-2 border-b-slate-700 focus:border-b-white focus:outline-1 focus:outline-offset-8 shadow-lg transition-all"
        id={id}
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
