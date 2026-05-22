import React from "react";
import { useAuth } from "../../context/Auth";

const Profile = () => {
  const [auth] = useAuth();

  const isAdmin = auth?.user?.role === 1;

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "90vh",
        background: "#f1f5f9",
      }}
    >
      <div className="col-md-5">

        <div className="card shadow border-0 rounded-4">

          {/* Header */}
          <div className="card-header text-center bg-white border-0 pt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile"
              className="rounded-circle shadow"
              style={{ width: "90px" }}
            />

            <h4 className="mt-3 fw-bold mb-0">
              {auth?.user?.name}
            </h4>

            <span
              className={`badge mt-2 ${
                isAdmin ? "bg-success" : "bg-primary"
              }`}
            >
              {isAdmin ? "Administrator" : "User"}
            </span>
          </div>

          {/* Body */}
          <div className="card-body px-4 pb-4">

            <ul className="list-group list-group-flush">

              <li className="list-group-item d-flex justify-content-between">
                <strong>Name</strong>
                <span className="text-muted">
                  {auth?.user?.name || "N/A"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <strong>Email</strong>
                <span className="text-muted">
                  {auth?.user?.email || "N/A"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <strong>Phone</strong>
                <span className="text-muted">
                  {auth?.user?.phone || "Not Added"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <strong>Address</strong>
                <span className="text-muted text-end">
                  {auth?.user?.address || "Not Added"}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <strong>Account Type</strong>
                <span className="text-muted">
                  {isAdmin ? "Admin" : "User"}
                </span>
              </li>

            </ul>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
