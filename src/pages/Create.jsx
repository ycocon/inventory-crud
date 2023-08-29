import React, { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { Link, Navigate } from "react-router-dom";
// icons
import { BsArrowLeft } from "react-icons/bs";

const Create = () => {
  const { dispatch } = useProductsContext();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("unit", unit);
    formData.append("price", price);
    formData.append("expiry", expiry);
    formData.append("inventory", inventory);
    formData.append("image", image);

    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setUnit("");
      setPrice("");
      setExpiry("");
      setInventory("");
      setImage(null);

      setError(null);
      setEmptyFields([]);
      dispatch({ type: "ADD_PRODUCT", payload: json });
      setSubmitted(true);
    }
  };

  if (submitted) return <Navigate to="/" />;

  return (
    <div className="create">
      <div className="createProductHeader">
        <h2>Add New Product</h2>
        <Link to="/">
          <BsArrowLeft size={15} />
          Go Home
        </Link>
      </div>

      <form className="createProductForm" onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes("name") ? "error" : ""}
        />

        <label>Product Unit:</label>
        <input
          type="text"
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
          className={emptyFields.includes("unit") ? "error" : ""}
        />

        <label>Product Price:</label>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={emptyFields.includes("price") ? "error" : ""}
        />

        <label>Product Expiry Date:</label>
        <input
          type="date"
          onChange={(e) => setExpiry(e.target.value)}
          value={expiry}
          className={emptyFields.includes("expiry") ? "error" : ""}
        />

        <label>Available Inventory:</label>
        <input
          type="number"
          onChange={(e) => setInventory(e.target.value)}
          value={inventory}
          className={emptyFields.includes("inventory") ? "error" : ""}
        />

        <label>Product Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className={emptyFields.includes("image") ? "error" : ""}
        />

        <button>Add Product</button>
        {error && <div className="error errorText">{error}</div>}
      </form>
    </div>
  );
};

export default Create;
