import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  console.log("hey: ", user);
  useEffect(() => {
    if (!user && !loading) {
      console.log("navigating");
      navigate("/auth");
    }
  }, [user, loading]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
}
export default Protected;