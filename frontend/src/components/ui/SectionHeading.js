import React from "react";
import PropTypes from "prop-types";

const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <div className={`${alignClass} ${className}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className={`section-title ${label ? "mt-4" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${align === "left" ? "mx-0" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeading.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  className: PropTypes.string,
};

export default SectionHeading;
