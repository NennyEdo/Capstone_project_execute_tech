import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ROUTES from "../components/ROUTES";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FormInput from "../components/FormInput";
import { registerUser } from "../services/authService";
import RegisterBG from "../assets/Images/registerbg.png";
import Manwalking from "../assets/Images/manwalkingbg.png";
import Logo from "../assets/Images/logo.png";

const schema = z
  .object({
    userName: z.string().min(2, "User Name is required"),
    fullName: z.string().min(2, "Full Name is required"),
    address: z.string().min(2, "Address is required"),
    occupation: z.string().min(2, "Occupation is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Phone is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
    agreed: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the terms.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await registerUser({
        userName: data.userName,
        fullName: data.fullName,
        address: data.address,
        email: data.email,
        occupation: data.occupation,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone,
      });
      if (response.status === 200) {
        if (response.data.error) {
          setError(response.data.error);
        } else if (response.data.errors) {
          const firstKey = Object.keys(response.data.errors)[0];
          const firstError = response.data.errors[firstKey][0];
          setError(firstError);
        } else {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate(ROUTES.LOGIN);
          }, 2000);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      let safeMessage = "An error occurred. Please try again.";
      if (err.response) {
        const msg = err.response.data.message || err.response.data.error;
        if (
          msg &&
          typeof msg === "string" &&
          !msg.toLowerCase().includes("stack") &&
          msg.length < 200
        ) {
          safeMessage = msg;
        }
      }
      setError(safeMessage);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface md:flex-row">
      <div className="absolute top-4 left-4 z-10">
        <Link to={ROUTES.HOME}>
          <img src={Logo} alt="Execute Tech Academy" className="h-12 w-auto md:h-16" />
        </Link>
      </div>

      <div className="relative hidden md:flex md:w-1/2 items-center justify-center overflow-hidden bg-navy-950">
        <img
          src={RegisterBG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-mesh-dark opacity-60" />
        <div className="relative z-10 mx-10 w-full max-w-lg rounded-[28px] border border-white/20 bg-white/10 p-10 backdrop-blur-xl shadow-card-hover">
          <img src={Manwalking} alt="Your Tech Journey" className="w-full rounded-3xl" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-10 md:px-16 md:py-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-3xl font-bold text-slate-900">Create an account</h2>
          <p className="mb-8 mt-2 text-slate-600">
            Join the Mastermind community and unlock access to cutting-edge tech programs.
          </p>

          <ErrorMessage message={error} />
          {isSubmitting && <LoadingSpinner text="Signing up..." />}
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
              <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Account created!</h3>
                <p className="text-slate-700 mb-4">Redirecting to login...</p>
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput label="User Name" name="userName" register={register} error={errors.userName?.message} />
            <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName?.message} />
            <FormInput label="Address" name="address" register={register} error={errors.address?.message} />
            <FormInput label="Occupation" name="occupation" register={register} error={errors.occupation?.message} />
            <FormInput label="Email Address" name="email" type="email" register={register} error={errors.email?.message} />
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              register={register}
              error={errors.phone?.message}
            />
            <div className="relative">
              <FormInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                register={register}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-16 cursor-pointer text-sm font-semibold text-slate-500 transition-colors hover:text-primary-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                register={register}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-16 cursor-pointer text-sm font-semibold text-slate-500 transition-colors hover:text-primary-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                {...register("agreed")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              I agree to the terms and conditions.
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full ${isSubmitting ? "!bg-slate-400" : ""}`}
            >
              {isSubmitting ? "Signing up..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="cursor-pointer font-semibold text-primary-600 transition-colors hover:text-primary-700">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
