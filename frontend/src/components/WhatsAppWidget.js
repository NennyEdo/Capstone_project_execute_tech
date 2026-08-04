import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const phoneNumber = "2348155177987";
const message = "Hello Execute Tech Academy, I am reaching out from your website and would like to learn more about Execute Tech Academy.";
const encodedMessage = encodeURIComponent(message);

const WhatsAppWidget = () => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_rgba(37,211,102,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-white"
      aria-label="Chat with Execute Tech Academy on WhatsApp"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#25D366] shadow-sm">
        <FaWhatsapp className="text-xl" />
      </div>
    </a>
  );
};

export default WhatsAppWidget;
