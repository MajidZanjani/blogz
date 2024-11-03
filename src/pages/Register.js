import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [fieldsValue, setFieldsValue] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFieldsValue(userName && password && email);
  }, [userName, password, email]);

  const handleChange = (event) => {
    const prop = event.target.id;
    const value = event.target.value;
    switch (prop) {
      case "userName-reg":
        setUserName(value);
        break;
      case "password-reg":
        setPassword(value);
        break;
      case "email-reg":
        setEmail(value);
        break;
      default: {
      }
    }
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const handleRegister = async () => {
    if (fieldsValue) {
      const newUser = {
        userName: userName,
        email: email,
        password: password,
      };
      const url = `${process.env.REACT_APP_DB_URL}/users`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User added:", data);
          navigate("/login");
        } else {
          const errorData = await response.json();
          console.error(
            "Error adding new user:",
            errorData || "Unknown error!"
          );
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <main className="p-1 my-3 border-2 border-yellow-400 rounded-xl w-1/2 grid">
        <div className="text-xl font-bold place-self-center mb-2">Register</div>

        <div className="flex space-x-2 my-2" id="email">
          <div className="ml-8"> E-Mail:</div>
          <input
            type="text"
            placeholder="email"
            id="email-reg"
            className="px-2 border-2 border-gray-300 rounded-lg w-2/3"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 my-2" id="username">
          <div> User Name:</div>
          <input
            type="text"
            placeholder="userName"
            id="userName-reg"
            className="px-2 border-2 border-gray-300 rounded-lg w-2/3"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 my-2" id="password">
          <div className="ml-3"> Password:</div>
          <input
            type={showPass ? "text" : "password"}
            placeholder="password"
            id="password-reg"
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
          className="rounded-xl bg-yellow-400 p-3 font-bold w-1/2 mt-5 hover:bg-yellow-800 hover:text-white place-self-center"
          onClick={handleRegister}
        >
          Register
        </button>
      </main>
    </div>
  );
};

export default Register;
