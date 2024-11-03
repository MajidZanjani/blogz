import { Route, Routes } from "react-router";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import { useContext } from "react";
import { MenuContext } from "./hooks/MenuContext";

function App() {
  const { isLoggedIn } = useContext(MenuContext);

  //Just for testing ADDPOST Page *********************
  const user = {
    id: "1728732406120",
    userName: "majid",
    email: "majid@email.com",
    password: "123",
  };
  localStorage.setItem("loggedUser", JSON.stringify(user));
  //Just for testing ADDPOST Page *********************

  return (
    <div className="min-h-screen px-2">
      <Routes>
        <Route path="/" element={<Blog />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts/:id" element={<Post />} />
        {isLoggedIn && <Route path="/addPost" element={<AddPost />} />}
        <Route path="*" element={<Blog />} />{" "}
        {/*Use Blog as fallback - PageNotFound should be used instead. */}
      </Routes>
    </div>
  );
}

export default App;
