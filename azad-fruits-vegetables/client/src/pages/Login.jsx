import axios from "axios";
import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("098765");
  const [showPassword, setShowPassword] =
    useState(false);
  const [errors, setErrors] = useState({});

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!password || password.length < 5) {
      newErrors.password =
        "Password must be at least 5 characters";
    }

    setErrors(newErrors);
    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await axios.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (data.status === "success") {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );

        alert(
          `${data.user.name}, ${data.msg}`
        );

        navigate(
          location.state ||
            `/dashboard/${
              data.user.role === 1
                ? "admin"
                : "user"
            }`
        );

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.msg ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center fw-bold text-success">
          🥬 Azad Veg & Fruits
        </h3>

        <p className="text-center text-muted mb-4">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <input
            type="email"
            className={`form-control mb-1 ${
              errors.email
                ? "is-invalid"
                : ""
            }`}
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
          />

          {errors.email && (
            <div className="invalid-feedback mb-2">
              {errors.email}
            </div>
          )}

          {/* Password */}
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            className={`form-control mb-1 ${
              errors.password
                ? "is-invalid"
                : ""
            }`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(
                e.target.value
              );
              clearError(
                "password"
              );
            }}
          />

          {errors.password && (
            <div className="invalid-feedback mb-2">
              {errors.password}
            </div>
          )}

          {/* Show Password */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            <label
              className="form-check-label"
              htmlFor="showPassword"
            >
              Show Password
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2"
            style={{
              borderRadius: "30px",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-success fw-semibold text-decoration-none"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;