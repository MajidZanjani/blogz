import { createContext, useState } from "react";

// Create Context
export const MenuContext = createContext();

// Create the Provider component
export const MenuProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("Home"); // Default menu
  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Toggle function to update selectedMenu state
  const toggleMenu = (menu) => setSelectedMenu(menu);
  const updateLoggedUser = (user) => {
    setLoggedUser(user);
    localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  }; // Function to clear the logged-in user
  const isLoggedIn = !!loggedUser;

  return (
    <MenuContext.Provider
      value={{
        selectedMenu,
        toggleMenu,
        loggedUser,
        updateLoggedUser,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
