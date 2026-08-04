import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/navbarlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden", !isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] px-2 pt-2 sm:px-4 sm:pt-4">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between rounded-[20px] border border-slate-200/80 bg-white/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(2,8,23,0.12)] backdrop-blur-2xl sm:px-5 sm:py-3 lg:px-6"
          aria-label="Main navigation"
        >
          <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <img
              src={Logo}
              alt="Execute Tech Academy"
              className="h-12 w-auto transition-opacity duration-200 hover:opacity-80 sm:h-14 lg:h-16"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative cursor-pointer rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary-50 text-primary-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="btn-primary !px-4 !py-2.5 text-sm"
            >
              Explore courses
            </button>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="cursor-pointer rounded-xl p-2 text-slate-700 transition-colors duration-200 hover:bg-slate-100 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[86vh] w-full max-w-2xl flex-col rounded-t-[28px] border border-slate-200/80 bg-white shadow-[0_-20px_60px_rgba(2,8,23,0.22)] transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-500">
              Navigate
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">Explore Execute Tech</p>
          </div>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="rounded-[20px] border border-primary-100 bg-gradient-to-br from-primary-50 to-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500 text-lg font-semibold text-white">
                ET
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Start your next step</p>
                <p className="text-sm text-slate-600">Pick a page and continue exploring.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-[18px] border px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "border-primary-200 bg-primary-50 text-primary-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary-200 hover:bg-slate-50"
                }`}
              >
                <span>{item.name}</span>
                <span className="text-base text-slate-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
          <button
            type="button"
            onClick={() => {
              closeMenu();
              navigate("/courses");
            }}
            className="btn-primary w-full"
          >
            Explore courses
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
