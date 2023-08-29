import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// icons
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
// custom hook
import { useProductsContext } from "../hooks/useProductsContext";

const Home = () => {
  const { products, dispatch } = useProductsContext();

  const handleClick = async (id) => {
    const response = await fetch("/api/products/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="productHeader">
        <h2>Products</h2>
        <Link to="/create">
          <AiOutlinePlus size={12} />
          Add New
        </Link>
      </div>
      <div className="products">
        {products &&
          products.map((product) => (
            <div className="productContent" key={product._id}>
              {/* <Link to="/edit" state={product} className="productTitle">
                {product.name}
                <BsArrowUpRight size={12} />
              </Link> */}
              <img
                src={`https://inventory-crud-backend.onrender.com/uploads/${product.image}`}
                alt="product image"
              />
              <div className="productDetails">
                <p>
                  <span>Product Name: </span>
                  {product.name}
                </p>
                <p>
                  <span>Product Unit: </span>
                  {product.unit}
                </p>
                <p>
                  <span>Product Price: </span>
                  {product.price}
                </p>
                <p>
                  <span>Product Expiry Date: </span>
                  {new Date(product.expiry).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </p>
                <p>
                  <span>Available Inventory Cost: </span>
                  {product.inventory}
                </p>
              </div>

              <div className="buttons">
                <Link to="/edit" state={product} className="edit">
                  Edit
                </Link>

                <a
                  href="#"
                  className="delete"
                  onClick={() => {
                    handleClick(product._id);
                  }}>
                  Delete
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
