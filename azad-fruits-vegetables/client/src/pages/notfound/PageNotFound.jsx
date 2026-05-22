import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5e9, #fff3e0, #f1f8e9)",
      }}
    >
      <div className="p-5 rounded shadow-lg bg-white">

        {/* 404 */}
        <h1
          className="display-1 fw-bold"
          style={{ color: "#28a745" }}
        >
          404
        </h1>

        {/* Title */}
        <h3 className="mb-3 fw-semibold">
          Oops! Page Not Found
        </h3>

        {/* Text */}
        <p className="text-muted mb-4">
          This page is missing like vegetables after closing time 😄
          <br />
          Let’s go back to fresh shopping!
        </p>

        {/* Button */}
        <Link
          to="/"
          className="btn btn-warning px-4 py-2 fw-bold shadow"
        >
          🏠 Back to Home
        </Link>

      </div>
    </div>
  );
};

export default PageNotFound;
