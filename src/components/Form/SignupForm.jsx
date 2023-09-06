import React from "react";
import AuthProviders from "./AuthProviders";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/auth";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
} from "../../utils/form-validate";
import AuthBtn from "../UI/AuthBtn";

const SignupForm = ({ setIsLoginPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { initiateSignup, loading } = useSignup();

  const signupHandler = async ({ name, email, password }) => {
    try {
      const res = await initiateSignup(name, email, password);
    } catch (error) {
      toast("error");
    }
  };

  return (
    <div className="form-container">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit(signupHandler)}>
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder=""
            {...register("name", nameValidate)}
          />
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder=""
            {...register("email", emailValidate)}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
        </div>
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <div className="form-field">
          <input
            type="password"
            name="password"
            placeholder=""
            {...register("password", passwordValidate)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        {loading ? (
          <AuthBtn active disabled text="Signup" />
        ) : (
          <AuthBtn text="Signup" />
        )}
      </form>
      <div className="change-mode">
        <p>Already a member?</p>
        <button type="button" onClick={() => setIsLoginPage((prev) => !prev)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
