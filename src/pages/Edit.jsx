import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
// icons
import { BsArrowLeft } from "react-icons/bs";

const Edit = () => {
  const location = useLocation();
  const Product = location.state;

  const [name, setName] = useState(Product?.name);
  const [unit, setUnit] = useState(Product?.unit);
  const [price, setPrice] = useState(Product?.price);
  const [expiry, setExpiry] = useState(Product?.expiry);
  const [inventory, setInventory] = useState(Product?.inventory);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, unit, price, expiry, inventory };

    const response = await fetch("/api/products/" + Product._id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
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

      setError(null);
      setEmptyFields([]);
      setSubmitted(true);
    }
  };

  if (submitted) return <Navigate to="/" />;

  return (
    <div className="edit">
      <div className="editProductHeader">
        <h2>Edit Product</h2>
        <Link to="/">
          <BsArrowLeft size={15} />
          Go Home
        </Link>
      </div>

      <form className="editProductForm" onSubmit={handleSubmit}>
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
          value={expiry.substr(0, 10)}
          className={emptyFields.includes("expiry") ? "error" : ""}
        />

        <label>Available Inventory:</label>
        <input
          type="number"
          onChange={(e) => setInventory(e.target.value)}
          value={inventory}
          className={emptyFields.includes("inventory") ? "error" : ""}
        />

        <button>Edit Product</button>
        {error && <div className="error errorText">{error}</div>}
      </form>
    </div>
  );
};

export default Edit;
