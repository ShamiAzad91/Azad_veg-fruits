// Checkout.jsx

import React, { useState } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  // total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  console.log("hii user",auth?.user?.name)

  // place order
 const handleOrder = async () => {

  if (loading) return;

  try {

    setLoading(true);

    const { data } = await axios.post(
      "/order/create-order",
      {
        cart,

        totalAmount: totalPrice,

        shippingAddress: `
          ${auth?.user?.address}
          Phone: ${auth?.user?.phone}
        `,
      }
    );

    if (data?.success) {

      toast.success(
        data?.message || "order successfully placed"
      );

      localStorage.removeItem("cart");

      setCart([]);

      navigate("/dashboard/user/orders");
    }

  } catch (error) {

    console.log(error);

    toast.error("Order failed");

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="container mt-4 mb-5">

      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-8">

          <h3 className="mb-3">
            Checkout
          </h3>

          {/* delivery */}
          <div className="border rounded p-3 mb-4">

            <h5>Delivery Details</h5>

            <p>
              <strong>Address:</strong>{" "}
              {auth?.user?.address}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {auth?.user?.phone}
            </p>

            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() =>
                navigate("/dashboard/user/profile")
              }
            >
              Change Details
            </button>

          </div>

          {/* payment */}
          <div className="border rounded p-3 mb-4">

            <h5>Payment Method</h5>

            <p className="mb-0">
              Cash On Delivery (COD)
            </p>

          </div>

          {/* place order */}
         <button
  disabled={loading}
  className="btn w-100 fw-semibold"
  style={{
    background:
      "linear-gradient(135deg,#f97316,#fb923c)",
    color: "#fff",
    border: "none",
    padding: "12px",
    fontSize: "18px",
  }}
  onClick={handleOrder}
>
  {loading ? "Placing Order..." : "Place Order"}
</button>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">

          <div className="border rounded p-3">

            <h4>Order Summary</h4>

            <hr />

            {cart.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between mb-2"
              >
                <span>{item.name}</span>

                <span>₹{item.price}</span>
              </div>
            ))}

            <hr />

            <h5>
              Total : ₹{totalPrice}
            </h5>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;