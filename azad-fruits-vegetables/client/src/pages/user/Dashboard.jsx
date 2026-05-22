import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import UserMenu from "../../components/layout/nav/UserMenu";

const UserDashboard = () => {
  const [auth,setAuth] = useAuth();

  return (
    <div className="container-fluid py-4" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div className="row">

        {/* ===== Sidebar ===== */}
        <div className="col-md-3">
         <UserMenu/>
        </div>

        {/* ===== Main Content ===== */}
        <div className="col-md-9">
          <div className="card shadow-sm border-0 rounded-4">
            <div
              className="card-header fw-bold text-white"
              style={{
                background: "linear-gradient(135deg,#f97316,#fb923c)",
              }}
            >
              👨‍💼 User Information
            </div>

            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Name :</strong>
                  <span>{auth?.user?.name}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Email :</strong>
                  <span>{auth?.user?.email}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Role :</strong>
                  <span className="badge bg-success">user</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
