import { useContext, useState } from "react";
import { MenuContext } from "../hooks/MenuContext";

const AddPost = () => {
  const { loggedUser } = useContext(MenuContext);
  const [posterFile, setPosterFile] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);

  const handleFileChange = (event) => {
    const { id, value, files } = event.target;
    if (id === "posterFile") {
      setPosterFile(files[0]);
      console.log(posterFile);
    } else if (id === "postTitle") {
      setPostTitle(value);
    } else if (id === "postContent") {
      setPostContent(value);
    }
  };

  const clearForm = () => {
    setPostContent(null);
    setPostTitle(null);
    setPosterFile(null);
    document.getElementById("posterFile").value = "";
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postTitle && postContent) {
      const formData = new FormData();
      formData.append("postTitle", postTitle);
      formData.append("postContent", postContent);
      formData.append("postAuthorId", loggedUser.id);
      formData.append("posterFile", posterFile);
      console.log(posterFile);

      try {
        const response = await fetch(`${process.env.REACT_APP_DB_URL}/posts`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          clearForm();
          console.log("Post added successfully");
        } else {
          console.error("Failed to add post:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("Title and Content are required fields.");
    }
  };

  return (
    <div className="flex justify-center">
      <main className="px-4 py-2 my-3 border-2 border-purple-400 rounded-xl w-full space-y-2 ">
        <div className="text-purple-700">
          {`Add Post By: ${loggedUser.userName}, UserID: ${loggedUser.id}, Email: ${loggedUser.email}`}
        </div>

        <h1 className="block text-sm font-medium text-gray-700">Post Title:</h1>
        <input
          type="text"
          id="postTitle"
          onChange={handleFileChange}
          className="border-2 border-gray-500 rounded-lg w-full p-1"
        />

        <h1 className="block text-sm font-medium text-gray-700">
          Post Content:
        </h1>
        <textarea
          name="postContent"
          id="postContent"
          onChange={handleFileChange}
          className="w-full h-80 border-2 border-gray-500 rounded-lg p-2"
        ></textarea>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Poster Image:
          </label>
          <input
            id="posterFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
        >
          Submit Post
        </button>
      </main>
    </div>
  );
};

export default AddPost;
