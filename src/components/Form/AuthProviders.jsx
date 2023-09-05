import React from "react";
import googleIcon from "../../assets/google.svg";

const AuthProviders = ({ googleLoginHandler }) => {
  return (
    <div className="other-login-methods">
      <div className="alternative-method" onClick={googleLoginHandler}>
        <img src={googleIcon} alt="google-icon" />
      </div>
    </div>
  );
};

export default AuthProviders;
