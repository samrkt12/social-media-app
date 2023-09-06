import React, { useState, lazy, Suspense } from "react";
import { useGetHomePosts } from "../hooks/posts";
import { useGetAllUsers } from "../hooks/users";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Card from "../components/UI/Card";

const LazyOptions = lazy(() => import("../components/Options/Options"));
const LazySearchBar = lazy(() => import("../components/SearchBar/SearchBar"));
const LazyUserCardsList = lazy(() =>
  import("../components/UserCard/UserCardsList")
);
const LazyPostsList = lazy(() => import("../components/Post/PostsList"));

const options = ["top", "latest", "people"];

const Explore = () => {
  const [filter, setFilter] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { posts, loading: postLoading } = useGetHomePosts(null, filter);
  const { users, loading: usersLoading } = useGetAllUsers();

  const placeholderText =
    filter === "people"
      ? "Search for people by name"
      : "Search for text or content";

  const filteredData =
    filter === "people"
      ? users?.filter((user) =>
          user.name.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      : posts?.filter((post) =>
          post.postText.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  return (
    <div className="explore">
      <Suspense
        fallback={
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <LoadingSpinner
              w="20px"
              h="20px"
              text="Loading options..."
              color="green"
            />
          </Card>
        }
      >
        <LazyOptions options={options} option={filter} setOption={setFilter} />
      </Suspense>

      <div style={{ width: "100%" }}>
        <Suspense
          fallback={
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <LoadingSpinner
                w="20px"
                h="20px"
                text="Loading searchbar..."
                color="green"
              />
            </Card>
          }
        >
          <LazySearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            placeholder={placeholderText}
          />
        </Suspense>
        {filter === "people" ? (
          <Suspense
            fallback={
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
                  text="Loading users..."
                  color="green"
                />
              </Card>
            }
          >
            <LazyUserCardsList
              users={filteredData}
              loading={usersLoading}
              emptyText="No users found here. Looks like we're in a ghost town! 👻"
            />
          </Suspense>
        ) : postLoading ? (
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
              text="Getting posts..."
              color="blue"
            />
          </Card>
        ) : (
          <Suspense
            fallback={
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
                  text="Loading posts..."
                  color="blue"
                />
              </Card>
            }
          >
            <LazyPostsList
              posts={filteredData}
              emptyText="Oops! It seems our search engine couldn't find any matching posts. Keep searching, and who knows what treasures you might uncover! 📝🔍✨"
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Explore;
