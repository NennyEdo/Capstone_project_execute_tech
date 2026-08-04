import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ label, name, type = "text", register, error, ...rest }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={name}
      type={type}
      {...register(name)}
      {...rest}
      className={`input-field mt-2 ${error ? "!border-red-400 focus:!border-red-400 focus:!ring-red-100" : ""}`}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <span id={`${name}-error`} className="mt-1 block text-xs text-red-600" role="alert">
        {error}
      </span>
    )}
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FormInput;
