import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import UserMenu from "../../components/layout/nav/UserMenu";
import moment from "moment";

const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  // GET ORDERS
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "/order/my-orders"
      );

      if (data?.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOAD ORDERS
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div className="row">

        {/* SIDEBAR */}
        <div className="col-md-3 mb-3">
          <UserMenu />
        </div>

        {/* MAIN */}
        <div className="col-md-9">

          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">

            {/* HEADER */}
            <div
              className="card-header fw-bold text-white fs-5 py-3"
              style={{
                background:
                  "linear-gradient(135deg,#f97316,#fb923c)",
              }}
            >
              🛍️ My Orders
            </div>

            {/* BODY */}
            <div className="card-body">

              {/* EMPTY */}
              {orders?.length === 0 && (
                <div className="text-center py-5">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="empty"
                    width="120"
                    className="mb-3"
                  />

                  <h4>No Orders Found</h4>

                  <p className="text-muted">
                    Start shopping fresh vegetables and fruits.
                  </p>

                </div>
              )}

              {/* ORDERS */}
              {orders?.map((o, i) => (
                <div
                  key={o._id}
                  className="border rounded-4 p-3 mb-4 shadow-sm bg-white"
                >

                  {/* ORDER TOP */}
                  <div className="row gy-3 mb-4">

                    {/* ORDER ID */}
                    <div className="col-md-3">
                      <small className="text-muted">
                        Order ID
                      </small>

                      <h6 className="fw-bold">
                        #{i + 1}
                      </h6>
                    </div>

                    {/* STATUS */}
                    <div className="col-md-3">
                      <small className="text-muted">
                        Status
                      </small>

                      <div>
                        <span
                          className="badge px-3 py-2"
                          style={{
                            background:
                              o.orderStatus === "Delivered"
                                ? "green"
                                : o.orderStatus === "Cancelled"
                                ? "red"
                                : "#f97316",
                          }}
                        >
                          {o.orderStatus}
                        </span>
                      </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="col-md-3">
                      <small className="text-muted">
                        Payment
                      </small>

                      <h6>
                        {o.paymentMethod}
                      </h6>
                    </div>

                    {/* TOTAL */}
                    <div className="col-md-3">
                      <small className="text-muted">
                        Total
                      </small>

                      <h6 className="fw-bold text-success">
                        ₹{o.totalAmount}
                      </h6>
                    </div>

                  </div>

                  {/* DATE */}
                  <div className="mb-4">
                    <small className="text-muted">
                      Ordered
                    </small>

                    <h6>
                      {moment(
                        o.createdAt
                      ).fromNow()}
                    </h6>
                  </div>

                  {/* SHIPPING */}
                  <div className="mb-4">

                    <small className="text-muted">
                      Delivery Details
                    </small>

                    <div className="bg-light rounded-3 p-3 mt-2">

                      {/* ADDRESS */}
                      <div className="mb-3">

                        <p className="fw-semibold mb-1">
                          📍 Address
                        </p>

                        <p className="text-muted mb-0">
                          {
                            o.shippingAddress
                              ?.split("Phone:")[0]
                          }
                        </p>

                      </div>

                      {/* PHONE */}
                      <div>

                        <p className="fw-semibold mb-1">
                          📞 Phone
                        </p>

                        <p className="text-muted mb-0">
                          {
                            o.shippingAddress
                              ?.split("Phone:")[1]
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* PRODUCTS */}
                  <div className="border-top pt-3">

                    <h6 className="fw-bold mb-3">
                      Ordered Products
                    </h6>

                    {o.products?.map((p) => (
                      <div
                        key={p._id}
                        className="d-flex align-items-center mb-3 border rounded-3 p-2"
                      >

                        {/* IMAGE */}
                        <img
                          src={p.image}
                          alt={p.name}
                          width="90"
                          height="90"
                          className="rounded-3 border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                        {/* INFO */}
                        <div className="ms-3 flex-grow-1">

                          <h5 className="mb-1">
                            {p.name}
                          </h5>

                          <p className="text-muted mb-1">
                            {p.description?.substring(
                              0,
                              70
                            )}...
                          </p>

                          <p className="mb-1 text-muted">
                            Quantity: {p.quantity}/{p.unit}
                          </p>

                          <h6
                            style={{
                              color: "#f97316",
                            }}
                          >
                            ₹{p.price}
                          </h6>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Order;