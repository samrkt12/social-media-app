import React from "react";
import AuthProviders from "./AuthProviders";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/auth";
import { emailValidate, passwordValidate } from "../../utils/form-validate";

const LoginForm = ({ setIsLoginPage }) => {
  const { initiateLogin, loading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const loginHandler = async (data) => {
    const res = await initiateLogin(data.email, data.password);
    if (res) reset();
  };
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder=""
            // autoComplete="email"
            {...register("email", emailValidate)}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        <div className="form-field">
          <input
            type="password"
            name="pwd"
            placeholder=""
            // autoComplete="current-password"
            {...register("password", passwordValidate)}
          />
          <label htmlFor="pwd" className="label">
            Password
          </label>
        </div>
        <div className="remember-me-container">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" name="remember" />
            <p>Remember me</p>
          </label>
          {!loading && <button type="submit">Log in</button>}
        </div>
      </form>
      <p>or continue with</p>
      <AuthProviders />
      <div className="change-mode">
        <p>Don't have an account yet?</p>
        <button type="button" onClick={() => setIsLoginPage((prev) => !prev)}>
          Register
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
