import React from "react";
import PropTypes from "prop-types";

const PageHero = ({
  label,
  title,
  subtitle,
  backgroundImage,
  backgroundOverlayClassName = "bg-navy-950/85",
  children,
  compact = false,
}) => {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 w-full min-w-full object-cover object-center opacity-20 brightness-90"
          />
          <div className={`absolute inset-0 ${backgroundOverlayClassName}`} />
        </>
      )}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-mesh-dark opacity-60" />

      <div
        className={`relative section-container px-4 text-center sm:px-6 ${
          compact ? "py-20 sm:py-24" : "py-20 sm:py-28 lg:py-32"
        }`}
      >
        {label && (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-300">
            {label}
          </p>
        )}
        <h1
          className={`mx-auto max-w-4xl font-display font-extrabold tracking-tight text-white ${
            compact
              ? "mt-4 text-3xl sm:text-4xl lg:text-5xl"
              : "mt-6 text-3xl sm:text-4xl lg:text-6xl"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base lg:text-lg">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-10 flex justify-center">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

PageHero.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundOverlayClassName: PropTypes.string,
  children: PropTypes.node,
  compact: PropTypes.bool,
};

export default PageHero;
