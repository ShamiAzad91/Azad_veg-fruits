import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  const [cart,setCart] = useCart();

  useEffect(() => {
    if (params?.slug) {
        // console.log("hiii",params?.slug)
      loadProductDetails();
    }
  }, [params?.slug]); // important fix

  const loadProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `/product/single/${params?.slug}`
      );

      setProduct(data.product);

    } catch (err) {
      console.log(err);
    }
  };

  //  loading state
  if (!product) {
    return <h3 className="text-center mt-5">Loading product...</h3>;
  }

  //cart
 const handleAddToCart = () => {
  const exist = cart.find(item => item._id === product._id);

  if (exist) {
    toast.error("Item already in cart");
    return;
  }

  setCart([...cart, product]);
  toast.success("Item added to cart");
};
  

  return (
    <div className="container mt-4">
      <div className="row shadow p-4 rounded">

        {/* LEFT: IMAGE */}
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="col-md-6">

          <h2>{product.name}</h2>

          <h3 style={{ color: "orange" }}>
            ₹ {product.price} / {product.unit}
          </h3>

          <hr />

          <p><b>Description:</b> {product.description}</p>

          <p><b>Category:</b> {product.category?.name}</p>

          <p>
            <b>Stock:</b>{" "}
            {product.stock > 0 ? (
              <span style={{ color: "green" }}>
                {product.stock} available
              </span>
            ) : (
              <span style={{ color: "red" }}>
                Out of stock
              </span>
            )}
          </p>

          <p>
            <b>Available:</b>{" "}
            {product.isAvailable ? "Yes ✅" : "No ❌"}
          </p>

          <p>
            <b>Shipping:</b>{" "}
            {product.shipping ? "Available 🚚" : "Not Available"}
          </p>

          <p><b>Sold:</b> {product.sold}</p>

          <p>
            <b>Quantity:</b> {product.quantity} {product.unit}
          </p>

          {/* 🔥 Low stock warning */}
          {product.stock < 5 && product.stock > 0 && (
            <p style={{ color: "orange" }}>
              Only few items left 🔥
            </p>
          )}

          {/* BUTTON */}
          <button className="btn btn-warning w-100 mt-3" onClick={handleAddToCart}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;