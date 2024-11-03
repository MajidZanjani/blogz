import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../hooks/MenuContext.js";
import { useNavigate } from "react-router";

const Login = () => {
  const { toggleMenu, updateLoggedUser } = useContext(MenuContext);

  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    toggleMenu("Login");
  }, [toggleMenu]);

  const handleChange = (event) => {
    const prop = event.target.id;
    const value = event.target.value;
    switch (prop) {
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      default: {
      }
    }
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleLogin = async () => {
    const url = `${process.env.REACT_APP_DB_URL}/users?userName=${userName}&password=${password}`;
    const userDataResponse = await fetch(url);
    const user = await userDataResponse.json();

    if (user) {
      setUser(user);
      updateLoggedUser(user); // Update context with logged user
      navigate("/");
    } else {
      console.log("User not found!");
    }
  };

  return (
    <div className="flex justify-center">
      <main className="p-1 my-3 border-2 border-blue-400 rounded-xl w-1/2 grid">
        <div className="text-xl font-bold place-self-center mb-2">Login</div>

        <div className="flex space-x-2 my-2" id="username">
          <div> User Name:</div>
          <input
            type="text"
            placeholder="userName"
            id="userName"
            className="px-2 border-2 border-gray-300 rounded-lg w-2/3"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 my-2" id="username">
          <div className="ml-3"> Password:</div>
          <input
            type={showPass ? "text" : "password"}
            placeholder="password"
            id="password"
            className="px-2 border-2 border-gray-300 rounded-lg w-2/3"
            onChange={handleChange}
          />
          <button
            className="bg-blue-400 rounded-lg px-1 hover:bg-blue-800 hover:text-white"
            onClick={handleShowPass}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        <button
          className="rounded-xl bg-green-400 p-3 font-bold w-1/2 mt-5 hover:bg-cyan-600 hover:text-white place-self-center"
          onClick={handleLogin}
        >
          {user ? <span>Logout</span> : <span>Login</span>}
        </button>

        {user && (
          <div className="text-red-500 mt-3">
            You've logged in as {user.userName}.
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
