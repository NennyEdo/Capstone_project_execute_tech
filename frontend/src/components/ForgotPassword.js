import React, { useState } from "react";
import api from "../utils/api";
import Logo from "../assets/Images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SuccesModal from "../components/SuccesModal"; // Import SuccesModal

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [SuccesModalOpen, setSuccesModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/verify-reset-token", {
        email,
        token: code.join(""),
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code!");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== reEnterPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/reset-password", {
        email,
        token: code.join(""),
        newPassword,
        confirmPassword: reEnterPassword,
      });
      setSuccesModalOpen(true); // Show success modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute top-5 left-5">
        <img src={Logo} alt="Company Logo" className="h-20 md:pl-[20rem]" />
      </div>

      <div className="md:w-[600px] w-[400px] bg-[#F5F7FC] rounded-xl shadow-sm p-8 md:p-[6rem]">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-[#101828] mb-1">
              Forgot Password?
            </h2>
            <p className="text-sm text-[#475467] mb-6">
              No worries, we will send you a reset instruction.
            </p>
            <label className="block text-sm text-[#344054] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-[#D0D5DD] rounded-lg w-full px-4 py-2 text-sm text-[#101828] focus:outline-none focus:border-[#2563eb] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleContinue}
              disabled={!email.trim() || loading}
              className={`w-full text-sm font-medium py-2 rounded-lg transition-colors 
                ${email.trim() && !loading ? "bg-[#2563eb] text-white hover:bg-[#2563eb]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
              `}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-[#101828] mb-1">
              Verify Your Email
            </h2>
            <p className="text-sm text-[#475467] mb-6">
              A 6-digit code has been sent to your mail.
            </p>
            <div className="flex justify-between gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="border border-[#D0D5DD] rounded-lg w-12 h-12 text-center text-xl text-[#101828] focus:outline-none focus:border-[#2563eb]"
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      const newCode = [...code];
                      newCode[index] = val;
                      setCode(newCode);
                    }
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={!code.every((d) => d.trim()) || loading}
              className="w-full text-sm font-medium py-2 rounded-lg transition-colors bg-[#2563eb] text-white"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold text-[#101828] mb-6">
              Input Password
            </h2>
            <label className="block text-sm text-[#344054] mb-2">
              New Password
            </label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="border border-[#D0D5DD] rounded-lg w-full px-4 py-2 text-sm text-[#101828] focus:outline-none focus:border-[#2563eb]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <label className="block text-sm text-[#344054] mb-2">
              Re-enter Password
            </label>
            <div className="relative mb-4">
              <input
                type={showReEnterPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="border border-[#D0D5DD] rounded-lg w-full px-4 py-2 text-sm text-[#101828] focus:outline-none focus:border-[#2563eb]"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showReEnterPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={handleResetPassword}
              disabled={!newPassword || !reEnterPassword || loading}
              className="w-full text-sm font-medium py-2 rounded-lg transition-colors bg-[#2563eb] text-white"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>

      {/* Success Modal */}
      <SuccesModal isOpen={SuccesModalOpen} onClose={() => setSuccesModalOpen(false)} />
    </div>
  );
};

export default ForgotPassword;
