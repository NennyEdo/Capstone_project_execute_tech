import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../components/ROUTES";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import FormInput from "../components/FormInput";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";
import RegisterBG from "../assets/Images/registerbg.png";
import Manwalking from "../assets/Images/manwalkingbg.png";
import Logo from "../assets/Images/logo.png";

const schema = z.object({
  UserNameOrEmail: z.string().min(2, "Email or Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      UserNameOrEmail: localStorage.getItem("rememberedEmail") || "",
      password: localStorage.getItem("rememberedPassword") || "",
      rememberMe: !!localStorage.getItem("rememberedEmail"),
    },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await loginUser({
        UserNameOrEmail: data.UserNameOrEmail,
        password: data.password,
      });
      setToken(response.data.token);
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.UserNameOrEmail);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      navigate(ROUTES.HOME);
    } catch (err) {
      let safeMessage = "An error occurred. Please try again.";
      if (err.response) {
        const msg = err.response.data?.message || err.response.data?.error;
        if (
          msg &&
          typeof msg === "string" &&
          !msg.toLowerCase().includes("stack") &&
          msg.length < 200
        ) {
          safeMessage = msg;
        } else if (err.response.status === 401) {
          safeMessage = "Invalid username or password.";
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

      <div className="flex w-full flex-col justify-center bg-white px-6 py-10 md:w-1/2 md:px-16 md:py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 pt-24 md:pt-4">
            <h1 className="font-display text-3xl font-bold text-slate-900">Welcome back!</h1>
            <p className="mt-2 text-slate-600">Access your dashboard, track your progress, and explore new opportunities in tech.</p>
          </div>

          <ErrorMessage message={error} />
          {isSubmitting && <LoadingSpinner text="Logging in..." />}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Email Address or Username"
              name="UserNameOrEmail"
              register={register}
              error={errors.UserNameOrEmail?.message}
            />

            <div className="relative">
              <FormInput
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-16 cursor-pointer text-sm font-semibold text-slate-500 transition-colors hover:text-primary-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                className="cursor-pointer font-semibold text-primary-600 transition-colors hover:text-primary-700"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full ${isSubmitting ? "!bg-slate-400" : ""}`}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="cursor-pointer font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <div className="relative hidden md:flex md:w-1/2 items-center justify-center overflow-hidden bg-navy-950">
        <img
          src={RegisterBG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-mesh-dark opacity-60" />
        <div className="relative z-10 mx-10 w-full max-w-md rounded-[28px] border border-white/20 bg-white/10 p-10 backdrop-blur-xl shadow-card-hover">
          <img src={Manwalking} alt="Your Tech Journey" className="w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
