import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

const Blog = () => {
  const postClass =
    "border-2 border-grey-300 rounded-lg p-2 w-80 h-80 min-w-0 max-w-full hover:bg-purple-100 hover:shadow-xl ease-in-out duration-300 flex gap-2";
  const posterClass = "min-w-24 max-w-24";
  const postTextClass = "font-mono overflow-hidden";

  const [postsWithAuthorNames, setPostsWithAuthorNames] = useState([]);

  const postsUrl = `${process.env.REACT_APP_DB_URL}/posts`; // Adjusted for Express API
  const usersUrl = `${process.env.REACT_APP_DB_URL}/users`; // Adjusted for Express API

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(postsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();

        const postsWithAuthors = await Promise.all(
          posts.map(async (post) => {
            const authorResponse = await fetch(`${usersUrl}/${post.authorId}`);
            if (!authorResponse.ok) {
              throw new Error(
                `Failed to fetch author with ID ${post.authorId}`
              );
            }
            const author = await authorResponse.json();
            return { ...post, authorName: _.capitalize(author.userName) };
          })
        );
        setPostsWithAuthorNames(postsWithAuthors);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [postsUrl, usersUrl]);

  const handleClick = (post) => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div>
      <h1 className="text-center font-bold font-sans text-2xl text-purple-900 mb-4">
        Latest Blog Posts
      </h1>
      <main className="flex justify-center grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {postsWithAuthorNames.map((post) => (
          <div
            className={postClass}
            key={post.id} // Use post.id as the key instead of index
            onClick={() => handleClick(post)}
          >
            <div className={posterClass}>
              <img src={post.poster} alt="blog poster" className="rounded-lg" />
            </div>
            <div className={postTextClass}>
              <h1 className="font-serif font-bold">{post.title}</h1>
              <h2 className="font-bold">{post.authorName}</h2>
              <h2 className="font-bold">{post.postDate}</h2>
              <div className="text-xs">{post.content}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Blog;
