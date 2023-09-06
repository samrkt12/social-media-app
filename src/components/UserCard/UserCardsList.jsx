import React from "react";
import UserCard from "./UserCard";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
const UserCardsList = ({ users, loading, emptyText }) => {
  if (loading)
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
          text="Getting users..."
          color="green"
        />
      </Card>
    );
  return (
    <div className="users-container">
      {users?.length === 0 ? (
        <Card className="user-card-container">
          <p
            style={{
              textAlign: "center",
              margin: "2.25rem auto",
              padding: "0 10px",
              color: "#333",
              maxWidth: "50ch",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {emptyText ? emptyText : `No users.`}
          </p>
        </Card>
      ) : (
        users?.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
};

export default UserCardsList;
