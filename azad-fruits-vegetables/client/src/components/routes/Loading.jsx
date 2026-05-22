import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loading = ({path="login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(`hello location`,location);
  

  // countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // redirect
  useEffect(() => {
    if (count === 0) {
      navigate(`${path}`,{
        state:location.pathname
      });
    }
  }, [count, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg,#e8f5e9,#fff3e0)",
      }}
    >
      <div
        className="card shadow-lg border-0 text-center p-4"
        style={{ width: "360px", borderRadius: "15px" }}
      >
        {/* Logo / Brand */}
        <h3 className="fw-bold text-success">
                  🥬 Azad Veg & Fruits

        </h3>

        {/* Spinner */}
        <div className="my-3">
          <div
            className="spinner-border text-success"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

        
<h6 className="mt-2">Preparing your dashboard...</h6>
        <p className="text-muted mt-2">
          Redirecting in{" "}
          <span className="fw-bold text-warning fs-4">
            {count}
          </span>{" "}
          sec
        </p>

        {/* Progress bar */}
        <div className="progress mt-3" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(3 - count) * 33}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
