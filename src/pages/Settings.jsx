import React from "react";
import { useState } from "react";
import SettingsDisplay from "../components/Settings/SettingsDisplay";
import SettingsForm from "../components/Settings/SettingsForm";
import { useAuth } from "../hooks/auth";

const Settings = () => {
  const { user, loading } = useAuth();
  const [isFormPage, setIsFormPage] = useState(false);
  return (
    <div className="settings-page">
      {!isFormPage ? (
        <SettingsDisplay setIsFormPage={setIsFormPage} />
      ) : loading ? (
        <p>Loading your form...</p>
      ) : (
        <SettingsForm setIsFormPage={setIsFormPage} user={user} />
      )}
    </div>
  );
};

export default Settings;
