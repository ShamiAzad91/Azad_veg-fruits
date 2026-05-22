import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // state
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/category/all");
      setCategories(data.category);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Validation
  if (!name || !description || !price || !quantity || !unit || !stock || !category) {
    return alert("Please fill all required fields");
  }

  if (!image) {
    return alert("Please upload product image");
  }

  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("unit", unit);
    productData.append("stock", stock);
    productData.append("category", category);
    productData.append("shipping", shipping);
    productData.append("image", image);

    const { data } = await axios.post(`/product/create`, productData);

    if (data?.error) {
      alert(data.error);
    } else {
      alert(`${data.product.name} created successfully`);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setUnit("");
      setStock("");
      setCategory("");
      setShipping("");
      setImage("");
      navigate("/dashboard/admin/products");
    }

  } catch (error) {
    console.log(error);

    // ✅ Proper error message
    if (error.response) {
      alert(error.response.data.message || "Server error");
    } else if (error.request) {
      alert("No response from server");
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow-sm border-0 rounded-4">
            <div
              className="card-header fw-bold text-white"
              style={{
                background: "linear-gradient(135deg,#f97316,#fb923c)",
              }}
            >
              Create Products
            </div>

            <div className="card-body">
              {/* Image Preview */}
              {image && (
                <div className="text-center mb-3">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product"
                    className="img-fluid rounded"
                    height="200px"
                  />
                </div>
              )}

              {/* Upload Image */}
              <label className="btn btn-outline-secondary w-100 mb-3">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              {/* Name */}
              <input
                type="text"
                placeholder="Product Name"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Description */}
              <textarea
                placeholder="Product Description"
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Quantity + Unit */}
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="form-control mb-3"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Unit (kg, piece, g)"
                    className="form-control mb-3"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                </div>
              </div>

              {/* Stock */}
              <input
                type="number"
                placeholder="Stock Available"
                className="form-control mb-3"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              {/* Category Select */}
              <Select
                showSearch
                placeholder="Select Category"
                size="large"
                className="mb-3 w-100"
                onChange={(value) => setCategory(value)}
                options={categories.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />

              {/* Shipping Select */}
              <Select
                placeholder="Shipping Available?"
                size="large"
                className="mb-3 w-100"
                onChange={(value) => setShipping(value)}
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />

              {/* Submit Button */}
              <button onClick={handleSubmit}
                className="btn w-100 text-white"
                style={{
                  background: "linear-gradient(135deg,#f97316,#fb923c)",
                  border: "none",
                }}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;