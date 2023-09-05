import React from "react";
import { useGetAllUsers } from "../../hooks/users";
import UserCard from "./UserCard";

const UserCardsList = () => {
  const { users, loading } = useGetAllUsers();
  if (loading) return <p>loading</p>;
  return (
    <div>
      {users?.length === 0 ? (
        <p>No Users</p>
      ) : (
        users?.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
};

export default UserCardsList;
