import React, { useEffect, useState } from "react";
import loginImage from "../assets/loginImage.png";
import "./Auth.scss";
import LoginForm from "../components/Form/LoginForm";
import SignupForm from "../components/Form/SignupForm";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !loading) navigate("/home");
    console.log(user);
  }, [user, loading]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="login-container">
      <div className="image-container">
        <img
          src={loginImage}
          alt="animated meditating monk"
          className="login-img"
        />
      </div>
      {isLoginPage ? (
        <LoginForm setIsLoginPage={setIsLoginPage} />
      ) : (
        <SignupForm setIsLoginPage={setIsLoginPage} />
      )}
    </div>
  );
};

export default Auth;
