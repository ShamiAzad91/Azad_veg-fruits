import React from "react";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  const navigate = useNavigate();

  // remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    toast.success("Item removed");
  };

  // total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <div className="container py-4">
      <h3 className="mb-4">🛒 Your Cart</h3>

      {cart.length === 0 ? (
       <>
       <h5 className="fw-semibold mb-3 text-secondary">
  Your cart is empty
</h5>

<button
  onClick={() => navigate("/shop")}
  className="btn px-4 py-2 fw-semibold rounded-3 shadow-sm"
  style={{
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    color: "#fff",
    border: "none",
    transition: "0.3s",
  }}
>
  Shop Now
</button>
       </>
      ) : (
        <div className="row">

          {/* LEFT - Items */}
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item._id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">

                  {/* Image */}
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="col-md-6">
                    <div className="card-body">
                      <h6>{item.name}</h6>
                      <p className="mb-1">
                        {item.quantity}/{item.unit}
                      </p>
                      <p className="text-success fw-bold">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="col-md-3 text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item._id)}
                    >
                      ❌ Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 rounded-4">
              <h5 className="fw-bold">Order Summary</h5>
              <hr />

              <p>Total Items: {cart.length}</p>

              <h4 className="text-success fw-bold">
                ₹{totalPrice.toLocaleString("en-IN")}
              </h4>

             <button
  className="btn w-100 mt-3 fw-semibold"
  style={{
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    color: "#fff",
    border: "none",
  }}
  disabled={!auth?.user?.address}
  onClick={() => navigate("/checkout")}   // adding 
>
  Proceed to Checkout
</button>

              

              <hr />

              {/* ===== Address Section ===== */}
              <div className="mt-3">
                <h6 className="fw-bold mb-2">Delivery Address</h6>

                {auth?.user?.address ? (
                  <div
                    className="p-3 rounded-3 mb-3"
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <p className="mb-2 small text-muted">
                      {auth.user.address}
                    </p>

                    <button
                      className="btn btn-sm w-100"
                      style={{
                        border: "1px solid #f97316",
                        color: "#f97316",
                        background: "transparent",
                      }}
                      onClick={() =>
                        navigate("/dashboard/user/profile")
                      }
                    >
                      ✏️ Update Address
                    </button>
                  </div>
                ) : (
                  <div
                    className="p-3 rounded-3 text-center"
                    style={{
                      background: "#fff7ed",
                      border: "1px dashed #fb923c",
                    }}
                  >
                    {auth?.token ? (
                      <>
                        <p className="small text-muted mb-2">
                          No delivery address added
                        </p>

                        <button
                          className="btn w-100"
                          style={{
                            background:
                              "linear-gradient(135deg,#f97316,#fb923c)",
                            color: "#fff",
                            border: "none",
                          }}
                          onClick={() =>
                            navigate("/dashboard/user/profile")
                          }
                        >
                          ➕ Add Delivery Address
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="small text-muted mb-2">
                          Please login to continue checkout
                        </p>

                        <button
                          className="btn btn-outline-danger w-100"
                          onClick={() => navigate("/login",{
                            state:'/cart'
                          })}
                        >
                          🔐 Login to Checkout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;