import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) =>
  message ? (
    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{message}</div>
  ) : null;

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
