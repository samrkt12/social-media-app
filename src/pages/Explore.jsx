import React, { useState, lazy, Suspense } from "react";
import { useGetHomePosts } from "../hooks/posts";
import { useGetAllUsers } from "../hooks/users";

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
      <Suspense fallback={<div>Loading Options...</div>}>
        <LazyOptions options={options} option={filter} setOption={setFilter} />
      </Suspense>

      <div style={{ width: "100%" }}>
        <Suspense fallback={<div>Loading SearchBar...</div>}>
          <LazySearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            placeholder={placeholderText}
          />
        </Suspense>
        {filter === "people" ? (
          <Suspense fallback={<div>Loading UserCards...</div>}>
            <LazyUserCardsList
              users={filteredData}
              loading={usersLoading}
              emptyText="No users found here. Looks like we're in a ghost town! 👻"
            />
          </Suspense>
        ) : postLoading ? (
          <p>Loading posts....</p>
        ) : (
          <Suspense fallback={<div>Loading PostsList...</div>}>
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
