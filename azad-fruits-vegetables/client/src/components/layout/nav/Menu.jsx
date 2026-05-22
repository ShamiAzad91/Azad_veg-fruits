import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/mylogo.jpg";
import { useAuth } from "../../../context/Auth";
import SearchForm from "../../form/SearchForm";
import { useCart } from "../../../context/Cart";

const Menu = () => {
  const [auth, setAuth] = useAuth();

  const [cart,setCart] = useCart();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background:
          "linear-gradient(90deg, #1b5e20 0%, #2e7d32 60%, #43a047 100%)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container">
        {/* Logo */}
        <NavLink
          to="/"
          className="navbar-brand fw-bold text-white d-flex align-items-center gap-2"
        >
          <img
            src={logo}
            alt="Azad Veg & Fruits"
            className="rounded-circle"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "cover",
              border: "2px solid #fff",
            }}
          />
          <span>Azad Veg & Fruits</span>
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#azadNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="azadNavbar">
          {/* Center Menu */}
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link fw-semibold ${
                    isActive ? "text-warning" : "text-white"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `nav-link fw-semibold ${
                    isActive ? "text-warning" : "text-white"
                  }`
                }
              >
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link fw-semibold ${
                    isActive ? "text-warning" : "text-white"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3 flex-wrap">

            {/* Search */}
          <SearchForm/>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="position-relative text-white"
            >
              <i className="bi bi-cart3 fs-4"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {cart.length}
              </span>
            </NavLink>

            {/* Auth Section */}
            {!auth?.user ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-light btn-sm px-3"
                  style={{ borderRadius: "20px" }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="btn btn-warning btn-sm fw-semibold px-3"
                  style={{ borderRadius: "20px" }}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-warning btn-sm fw-semibold dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ borderRadius: "20px" }}
                >
                  👤 {auth?.user?.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" :"user"}`}
                      className="dropdown-item"
                    >
                      📊 Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/profile"
                      className="dropdown-item"
                    >
                      👤 Profile
                    </NavLink>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      onClick={logout}
                      className="dropdown-item text-danger fw-semibold"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
