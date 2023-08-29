import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.css";
import "./index.scss";
import { ProductsContextProvider } from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </React.StrictMode>
);
