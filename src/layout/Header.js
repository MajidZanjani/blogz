import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../hooks/MenuContext";
import Logo from "../assets/images/logo.png";

const Header = () => {
  const { selectedMenu, toggleMenu, loggedUser, logout } =
    useContext(MenuContext);
  const navigate = useNavigate();
  const [userShow, setUserShow] = useState("hidden");
  const classLi =
    "cursor-pointer hover:text-purple-700 hover:shadow-xl p-3 rounded-lg ease-in-out duration-300";

  // Combined function to update the selected menu and navigate
  const handleMenuClick = (menu, path) => {
    toggleMenu(menu);
    navigate(path);
  };

  useEffect(() => {
    loggedUser ? setUserShow("") : setUserShow("hidden");
  }, [loggedUser]);

  return (
    <div
      id={selectedMenu}
      className="flex text-xl bg-white font-bold p-3 border-b-2 mb-4 sticky top-0"
    >
      <div
        id="logo"
        className="cursor-pointer mr-3"
        onClick={() => navigate("/")}
      >
        <img
          src={Logo}
          alt="Logo"
          className="max-w-20 rounded-xl shadow-lg hover:shadow-xl hover:shadow-zinc-500 ease-in-out duration-300"
        />
      </div>
      <div id="nav">
        <ul className="flex flex-row font-mono">
          <li onClick={() => handleMenuClick("Home", "/")} className={classLi}>
            Home
          </li>
          {!loggedUser && (
            <li
              onClick={() => handleMenuClick("Login", "/login")}
              className={classLi}
            >
              Login
            </li>
          )}
          {!loggedUser && (
            <li
              onClick={() => handleMenuClick("Register", "/register")}
              className={classLi}
            >
              Register
            </li>
          )}
          {loggedUser && (
            <li
              onClick={() => handleMenuClick("AddPost", "/addPost")}
              className={classLi}
            >
              Add Post
            </li>
          )}
          <li
            onClick={() => handleMenuClick("Contact", "/contact")}
            className={classLi}
          >
            Contact
          </li>
        </ul>
      </div>
      <div
        id="loggedUser"
        className={`ml-auto p-3 font-sans bg-blue-200 rounded-xl ${userShow}`}
        onClick={logout}
      >
        {loggedUser
          ? `Logged as ${loggedUser.userName}. Press here for logout.`
          : "Anonymous"}
      </div>
    </div>
  );
};

export default Header;
