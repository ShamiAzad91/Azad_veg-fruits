import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import UserMenu from "../../components/layout/nav/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("auth/myprofile", {
        name,
        password,
        address,
      });

      //  Update state + localStorage (clean way)
      const updatedAuth = {
        ...auth,
        user: data,
      };

      setAuth(updatedAuth);
      localStorage.setItem("auth", JSON.stringify(updatedAuth));

      toast.success("Profile updated successfully");

      // clear password field
      setPassword("");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow border-0 rounded-4 p-4">

            {/* Header */}
            <h4
              className="fw-bold mb-4 text-center"
              style={{ color: "#f97316" }}
            >
              Update Profile
            </h4>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3 bg-light"
                  value={email}
                  disabled
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  className="form-control rounded-3"
                  rows="3"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  className="btn px-4 py-2 rounded-3 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg,#f97316,#fb923c)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Update Profile
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;