import React from "react";
import googleIcon from "../../assets/google.svg";
import facebookIcon from "../../assets/facebook.svg";
import githubIcon from "../../assets/github.svg";
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from "../../firebase";

const AuthProviders = () => {
  return (
    <div className="other-login-methods">
      <div className="alternative-method" onClick={signInWithGoogle}>
        <img src={googleIcon} alt="google-icon" />
      </div>
      <div className="alternative-method" onClick={signInWithFacebook}>
        <img src={facebookIcon} alt="facebook-icon" />
      </div>
      <div className="alternative-method" onClick={signInWithGithub}>
        <img src={githubIcon} alt="github-icon" />
      </div>
    </div>
  );
};

export default AuthProviders;
