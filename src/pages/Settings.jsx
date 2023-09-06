import React from "react";
import { useState } from "react";
import SettingsDisplay from "../components/Settings/SettingsDisplay";
import SettingsForm from "../components/Settings/SettingsForm";
import { useAuth } from "../hooks/auth";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Settings = () => {
  const { user, loading } = useAuth();
  const [isFormPage, setIsFormPage] = useState(false);
  return (
    <div className="settings-page">
      {!isFormPage ? (
        <SettingsDisplay setIsFormPage={setIsFormPage} />
      ) : loading ? (
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
            text="Loading form..."
            color="green"
          />
        </Card>
      ) : (
        <SettingsForm setIsFormPage={setIsFormPage} user={user} />
      )}
    </div>
  );
};

export default Settings;
