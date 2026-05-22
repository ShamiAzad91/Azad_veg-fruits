import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/nav/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Button, Modal } from "antd";

const AdminCategory = () => {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updatingName,setUpdatingName]= useState('');

  // ✅ Professional Theme
  const theme = {
    pageBg: "#f4f6f9",
    cardBg: "#ffffff",
    primary: "#198754",
    soft: "#e8f5e9",
    border: "#e5e7eb",
    heading: "#2c3e50",
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/category/all");
      // console.log("hello", data.category);
      setCategories(data.category);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/category/create", { name });

      if (data?.status === "success") {
        alert(`${data.category?.name} ${data.msg}`);
        setName("");
        loadCategories();
      } else {
        setError(data?.msg || "Failed to create category");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };


const handleUpdate = async (e) => {
  e.preventDefault();

  // ✅ 1. empty check
  if (!updatingName.trim()) {
    return alert("Category name required");
  }

  // ✅ 2. no-change check (IMPORTANT)
  if (updatingName.trim() === selected?.name) {
    return alert("No changes detected");
  }

  try {
    const { data } = await axios.put(
      `/category/update/${selected._id}`,
      { name: updatingName }
    );

    if (data?.error) {
      return alert(data.error);
    } else {
      alert(`${data.category.name} is updated`);

      setIsModalOpen(false);
      setUpdatingName("");
      setSelected(null);

      loadCategories(); // ✅ refresh UI
    }
  } catch (err) {
    console.log(err);
  }
};


const handleDelete = async (e) => {
  e.preventDefault();
let ans = confirm("Are you sure want to delte this category?");
if(!ans){
  return
}

  try {
    const { data } = await axios.delete(
      `/category/remove/${selected._id}`
    );
    console.log("my data ",data)

    if (data?.error) {
      return alert(data.error);
    } else {
      alert(`${data.removed.name} is deleted`);

      setIsModalOpen(false);
      setUpdatingName("");
      setSelected(null);

      loadCategories(); // refresh UI
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div
      className="container-fluid py-4"
      style={{ background: theme.pageBg, minHeight: "100vh" }}
    >
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div
            className="card shadow-sm border-0 rounded-3"
            style={{ background: theme.cardBg }}
          >
            {/* Header */}
            <div
              className="card-header fw-bold"
              style={{
                background: "#fff",
                borderBottom: `1px solid ${theme.border}`,
                color: theme.heading,
              }}
            >
              📂 Category Management
            </div>

            <div className="card-body">
              {/* ===== CREATE CATEGORY FORM ===== */}
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
              <hr />
              {/* ===== CATEGORY BUTTON LIST ===== */}
              <div className="text-center">
                {categories?.map((c) => (
                  <button
                    key={c._id}
                    className="btn m-1 px-3"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelected(c)
                      setUpdatingName(c.name)
                    }}
                    style={{
                      background: theme.soft,
                      color: theme.primary,
                      border: `1px solid ${theme.border}`,
                      fontWeight: "500",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                footer={null}
              >
               <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                btnText="update category"
                handleDelete={handleDelete}
              />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
