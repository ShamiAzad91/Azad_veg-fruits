import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminProducts = () => {
  const [auth,setAuth] = useAuth();

  //state
  const [products,setProducts] = useState([]);

  useEffect(()=>{
   loadProducts();
  },[]);

  const loadProducts = async()=>{
    try {
        const {data} = await axios.get(`/product/all`);
        // console.log(`hiii`,data);
        setProducts(data.products);
    } catch (err) {
        
    }
  }

  return (
    <div className="container-fluid py-4" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div className="row">

        {/* ===== Sidebar ===== */}
        <div className="col-md-3">
         <AdminMenu/>
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
              Products
            </div>

        {products?.map((p) => (
  <Link
    key={p._id}
    to={`/dashboard/admin/product/update/${p.slug}`}
    className="product-link"
  >
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={p.image}
            alt={p.name}
            className="img img-fluid rounded-start"
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description?.substring(0,160)}..</p>
            <p className="card-text">
              <small>
                {moment(p.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
