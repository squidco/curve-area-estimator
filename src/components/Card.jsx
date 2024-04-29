import React from "react";
import PropTypes from "prop-types";

export default function Card({ title, children }) {
  return (
    <div className="p-1 m-1">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};
