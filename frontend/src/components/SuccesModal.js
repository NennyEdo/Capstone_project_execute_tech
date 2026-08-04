import React from "react";
import PropTypes from "prop-types";

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-[400px]">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-[#16857A] flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.172l7.071-7.071-1.414-1.414L10 12.343 7.343 9.757l-1.414 1.414L10 15.172z"
                />
              </svg>
            </div>
          </div>
          <p className="text-[#101828] text-lg mt-4">
            Password Successfully updated.
          </p>
          <p className="mt-2 text-gray-600">You can now log in with your new password.</p>
        <button
          onClick={() => {
            onClose(); 
            window.location.href = "/login"; // Redirect to login page
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back to Login
        </button>
        </div>
      </div>
    );
  };
  
  SuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  export default SuccessModal;