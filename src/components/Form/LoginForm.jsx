import React from "react";
import AuthProviders from "./AuthProviders";
import { useForm } from "react-hook-form";
import { useLogin, useSignInWithGoogle } from "../../hooks/auth";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import AuthBtn from "../UI/AuthBtn";

const LoginForm = ({ setIsLoginPage }) => {
  const { initiateLogin, loading } = useLogin();
  const { register, handleSubmit, reset } = useForm();

  const { signInWithGoogle, loading: googleLoading } = useSignInWithGoogle();

  const loginHandler = async (data) => {
    const res = await initiateLogin(data.email, data.password);
    if (res) reset();
  };

  const googleLoginHandler = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="form-container">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(loginHandler)}>
        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder=""
            className="input"
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
            className="input"
            {...register("password", passwordValidate)}
          />
          <label htmlFor="pwd" className="label">
            Password
          </label>
        </div>
        {/* <p>Password must be 6 characters long</p> */}
        {loading || googleLoading ? (
          <AuthBtn active disabled text="Login" />
        ) : (
          <AuthBtn text="Login" />
        )}
      </form>
      <p>or continue with</p>
      <AuthProviders googleLoginHandler={googleLoginHandler} />
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
