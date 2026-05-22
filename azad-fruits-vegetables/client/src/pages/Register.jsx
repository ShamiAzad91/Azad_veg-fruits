import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // Clear specific field error
  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!name || name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phone || phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!address || address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!password || password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      name,
      email,
      phone,
      address,
      password,
    };

    console.log("Validated Register Data:", userData);
    try {
      const {data} = await axios.post(`http://localhost:8080/api/v1/auth/register`,userData);

      // console.log(data);
      if(data.status === "success"){
    
      alert(`${data.user.name},${data.msg}`|| "user register successfully");

      //empty the state
      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setPhone("")
      setConfirmPassword("");

      navigate("/login");

      }
      
    } catch (error) {

          console.error(error);
          alert(`something went wrong`)
          return
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center fw-bold text-success">
          🥬 Azad Veg & Fruits
        </h3>
        <p className="text-center text-muted mb-4">
          Create your account
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <input
            className={`form-control mb-1 ${errors.name ? "is-invalid" : ""}`}
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
          />
          {errors.name && <div className="invalid-feedback mb-2">{errors.name}</div>}

          {/* Email */}
          <input
            type="email"
            className={`form-control mb-1 ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
          />
          {errors.email && <div className="invalid-feedback mb-2">{errors.email}</div>}

          {/* Phone */}
          <input
            type="tel"
            className={`form-control mb-1 ${errors.phone ? "is-invalid" : ""}`}
            placeholder="Mobile Number"
            maxLength="10"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ""));
              clearError("phone");
            }}
          />
          {errors.phone && <div className="invalid-feedback mb-2">{errors.phone}</div>}

          {/* Address */}
          <textarea
            className={`form-control mb-1 ${errors.address ? "is-invalid" : ""}`}
            placeholder="Delivery Address"
            rows="2"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              clearError("address");
            }}
          />
          {errors.address && (
            <div className="invalid-feedback mb-2">{errors.address}</div>
          )}

          {/* Password */}
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control mb-1 ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError("password");
            }}
          />
          {errors.password && (
            <div className="invalid-feedback mb-2">{errors.password}</div>
          )}

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control mb-2 ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearError("confirmPassword");
            }}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback mb-2">
              {errors.confirmPassword}
            </div>
          )}

          {/* Show Password Checkbox */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2"
            style={{ borderRadius: "30px" }}
          >
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-success fw-semibold text-decoration-none"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
