import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import _ from "lodash";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch post data first
        const postUrl = `${process.env.REACT_APP_DB_URL}/posts/${id}`;
        const postDataResponse = await fetch(postUrl);
        const postData = await postDataResponse.json();
        setPost(postData);

        // Fetch author data if authorId is present
        if (postData && postData.authorId) {
          const userUrl = `${process.env.REACT_APP_DB_URL}/users/${postData.authorId}`;
          const authorDataResponse = await fetch(userUrl);
          const authorData = await authorDataResponse.json();
          setAuthor(authorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center" onClick={() => navigate("/posts")}>
      <main className="px-4 py-2 my-3 border-2 border-gray-200 rounded-xl w-full max-w-4xl">
        <div className="flex flex-cols-4 gap-4 mt-2">
          <img
            src={post.poster ? `../${post.poster}` : ""}
            alt="blogPoster"
            className="rounded-lg max-w-60 max-h-60"
          />
          <div className="space-y-2">
            <h1 className="font-bold text-xl text-purple-800">{post.title}</h1>
            <h2 className="font-bold">
              Author: {_.capitalize(author.userName) || "Unknown"}
            </h2>
            <h2 className="font-bold mb-3">Date: {post.postDate}</h2>
          </div>
        </div>
        <div className="font-serif text-lg mt-4">{post.content}</div>
      </main>
    </div>
  );
};

export default Post;
