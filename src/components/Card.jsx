import React from "react";
import PropTypes from "prop-types";

export default function Card({ title, children, className }) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p className="min-h-6">{children}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};
