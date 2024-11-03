import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import App from "./App";
import { MenuProvider } from "./hooks/MenuContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>
);
