import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* Image FIRST on mobile */}
          <div className="col-lg-6 text-center order-1 order-lg-2 mb-4 mb-lg-0">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh organic vegetables"
              className="img-fluid rounded-4 shadow"
              style={{
                maxHeight: "280px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Text */}
          <div className="col-lg-6 text-center text-lg-start order-2 order-lg-1">
            <h1 className="fw-bold" style={{ color: "#1b5e20" }}>
              Eat Fresh. Live Healthy.
              <br />
              <span style={{ color: "#ff9800" }}>
                Every Single Day.
              </span>
            </h1>

            <p className="mt-3" style={{ color: "#455a64" }}>
              Farm-fresh fruits and vegetables brought straight
              <br />
              from local farmers to your doorstep.
            </p>

            <div className="mt-4 d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
  
  <NavLink
    to="/shop"
    className="btn btn-success px-4 py-2 text-decoration-none"
    style={{ borderRadius: "30px" }}
  >
    🛒 Shop Now
  </NavLink>

  <NavLink
    to="/shop"
    className="btn btn-outline-success px-4 py-2 text-decoration-none"
    style={{ borderRadius: "30px" }}
  >
    🧺 Browse Fresh Items
  </NavLink>

</div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
