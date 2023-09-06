import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate("/auth");
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
          text="Getting your details..."
          color="green"
        />
      </Card>
    );
  }

  return children;
}
export default Protected;
