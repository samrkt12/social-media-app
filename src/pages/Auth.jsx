import React, { useEffect, useState } from "react";
import loginImage from "../assets/loginImage.png";
import "./Auth.scss";
import LoginForm from "../components/Form/LoginForm";
import SignupForm from "../components/Form/SignupForm";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) navigate("/home");
  }, [user, loading]);

  if (loading) {
    return (
      <Card
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <LoadingSpinner
          w="50px"
          h="50px"
          text="Checking authentication..."
          color="green"
        />
      </Card>
    );
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
