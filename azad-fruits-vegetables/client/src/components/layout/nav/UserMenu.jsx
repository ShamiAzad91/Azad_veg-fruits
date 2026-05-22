import React from 'react';
import { NavLink } from "react-router-dom";


const UserMenu = () => {
  return (
    <>
     <div className="card shadow-sm border-0 rounded-4">
            <div
              className="card-header text-white fw-bold text-center"
              style={{
                background: "linear-gradient(135deg,#16a34a,#22c55e)",
                borderRadius: "12px 12px 0 0",
              }}
            >
              🥦 user Panel
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0">
                <NavLink
                  to="/dashboard/user/profile"
                  className={({ isActive }) =>
                    `nav-link rounded-3 ${
                      isActive ? "bg-success text-white" : "text-dark"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>

              <li className="list-group-item border-0">
                <NavLink
                  to="/dashboard/user/orders"
                  className={({ isActive }) =>
                    `nav-link rounded-3 ${
                      isActive ? "bg-success text-white" : "text-dark"
                    }`
                  }
                >
                Orders
                </NavLink>
              </li>
            </ul>
          </div>
    </>
  )
}

export default UserMenu