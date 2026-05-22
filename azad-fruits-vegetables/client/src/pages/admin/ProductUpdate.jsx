import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductUpdate = () => {
  const [auth] = useAuth();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  // ✅ NEW
  const [originalProduct, setOriginalProduct] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Load product
  useEffect(() => {
    loadProducts();
  }, [params.slug]);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/category/all");
      setCategories(data.category);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/product/single/${params.slug}`);

      const product = data.product;

      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setUnit(product.unit);
      setStock(product.stock);
      setCategory(product.category._id);
      setShipping(product.shipping ? "1" : "0");
      setImage(product.image);
      setId(product._id);

      // ✅ Save original
      setOriginalProduct(product);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ CHECK CHANGE
  const isChanged = () => {
    if (!originalProduct) return false;

    return (
      originalProduct.name !== name ||
      originalProduct.description !== description ||
      originalProduct.price != price ||
      originalProduct.quantity != quantity ||
      originalProduct.unit !== unit ||
      originalProduct.stock != stock ||
      originalProduct.category._id !== category ||
      (originalProduct.shipping ? "1" : "0") !== shipping ||
      typeof image !== "string"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ No change
    if (!isChanged()) {
      return alert("No changes made");
    }

    // Validation
    if (!name || !description || !price || !quantity || !unit || !stock || !category) {
      return alert("Please fill all fields");
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

      // ✅ only new image
      if (image && typeof image !== "string") {
        productData.append("image", image);
      }

      const { data } = await axios.put(`/product/update/${id}`, productData);

      if (data?.error) {
        alert(data.error);
      } else {
        alert(`${data.product.name} updated successfully`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleDelete = async()=>{
    // alert("delted");
    try {
       let ans = window.confirm("Are you sure Want To delete this product");
    if(!ans){
      return 
    }
  //  console.log("my product id is ",id);
 
      const {data} = await axios.delete(`/product/remove/${id}`);
      if(data?.error){
        alert("unable to delete this product");
      }else{
        console.log("hooooo",data);
        
        alert("successfully delted the product from DB");
        navigate("/dashboard/admin/products");

      }
      
    } catch (err) {
      console.log(err);
      alert("unable to delete this product")
      
    }

    

  }

  return (
    <div className="container-fluid py-4">
      <div className="row">

        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <div className="card">

            <div className="card-header">Update Product</div>

            <div className="card-body">

              {/* Image */}
              {image && (
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt="product"
                  style={{ width: "120px", display: "block", margin: "auto" }}
                />
              )}

              <label className="btn btn-outline-secondary w-100 mb-3">
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>

              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />

              <input
                type="number"
                className="form-control mb-3"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              {/* Category */}
              <Select
                className="mb-3 w-100"
                value={category}
                onChange={(value) => setCategory(value)}
                options={categories.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
              />

              {/* ✅ Shipping FIXED */}
              <Select
                className="mb-3 w-100"
                value={shipping}
                onChange={(value) => setShipping(value)}
                options={[
                  { value: "0", label: "No" },
                  { value: "1", label: "Yes" },
                ]}
              />
<div className="d-flex gap-3">
  <button onClick={handleSubmit} className="btn btn-update text-white w-50">
    Update Product
  </button>

  <button onClick={handleDelete} className="btn btn-delete text-white w-50">
    Delete
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;