import React from 'react';
import { NavLink } from "react-router-dom";


const AdminMenu = () => {
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
              🥦 Admin Panel
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0">
                <NavLink
                  to="/dashboard/admin/category"
                  className={({ isActive }) =>
                    `nav-link rounded-3 ${
                      isActive ? "bg-success text-white" : "text-dark"
                    }`
                  }
                >
                  📂 Create Category
                </NavLink>
              </li>

              <li className="list-group-item border-0">
                <NavLink
                  to="/dashboard/admin/product"
                  className={({ isActive }) =>
                    `nav-link rounded-3 ${
                      isActive ? "bg-success text-white" : "text-dark"
                    }`
                  }
                >
                  🛒 Create Product
                </NavLink>
              </li>

               <li className="list-group-item border-0">
                <NavLink
                  to="/dashboard/admin/products"
                  className={({ isActive }) =>
                    `nav-link rounded-3 ${
                      isActive ? "bg-success text-white" : "text-dark"
                    }`
                  }
                >
                 📦 All Products 
                </NavLink>
              </li>
              <li className="list-group-item border-0">
  <NavLink
    to="/dashboard/admin/orders"
    className={({ isActive }) =>
      `nav-link rounded-3 ${
        isActive
          ? "bg-success text-white"
          : "text-dark"
      }`
    }
  >
    📋 Manage Orders
  </NavLink>
</li>
            </ul>
          </div>
    </>
  )
}

export default AdminMenu