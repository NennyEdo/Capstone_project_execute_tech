import React, { useState, useEffect } from "react";

const PaymentOption = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState("debitCreditCard");

  // Form fields for main form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Form fields for card details modal
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Check if main form fields are valid (non-empty)
  const isMainFormValid = fullName.trim() !== "" && email.trim() !== "";

  // Check if card details are valid (non-empty)
  const isCardFormValid =
    cardNumber.trim() !== "" &&
    cardExpiry.trim() !== "" &&
    cardCvv.trim() !== "";

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handlePaymentSelection = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isMainFormValid) return; // Prevent submission if fields are empty
    if (paymentOption === "debitCreditCard") {
      setShowModal(true);
    } else {
      alert("Proceeding with Direct Bank Transfer");
    }
  };

  const closeModal = () => setShowModal(false);

  const handleCardSubmit = (event) => {
    event.preventDefault();
    if (!isCardFormValid) return; // Prevent submission if card fields are empty
    // Proceed with card payment logic here
    alert("Payment processed");
    closeModal();
  };

  return (
    <div>
      <div className="payment-container max-w-md mx-auto p-8 border rounded-lg shadow-md bg-white mt-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <h2 className="text-base font-semibold mt-8 mb-4">Payment Options</h2>

          <div className="payment-options space-y-4">
            <label className="flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-400">
              <input
                type="radio"
                name="payment"
                value="bankTransfer"
                onChange={handlePaymentSelection}
                className="form-radio"
              />
              <span>Direct Bank Transfer</span>
            </label>
            <label className="flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-400">
              <input
                type="radio"
                name="payment"
                value="debitCreditCard"
                onChange={handlePaymentSelection}
                defaultChecked
                className="form-radio"
              />
              <span>Debit/Credit Card</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isMainFormValid}
            className={`mt-8 w-full py-3 px-6 rounded-lg shadow-md transition ${
              isMainFormValid
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Enter card details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>
            <form onSubmit={handleCardSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">Card Expired Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!isCardFormValid}
                className={`w-full py-3 rounded-lg transition ${
                  isCardFormValid
                    ? "bg-blue-700 text-white hover:bg-blue-800"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Pay NGN 35,000
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOption;
