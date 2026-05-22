import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "./prices.js";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total,setTotal] = useState(0);
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState(1)


  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadProducts();
    loadCategories();
    getTotal();
  }, []);

  useEffect(()=>{
    if(page === 1){
      return
    }
    loadMore()

  },[page])

  //pagination
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/product/list-products/${page}`);
      console.log("myload products",data.products)
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
 const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/product/list-products/${page}`);
      // console.log("myload products",data.products)
      setProducts([...products,...data.products]);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`/category/all`);
      setCategories(data.category);
    } catch (err) {
      console.log(err);
    }
  };


  const getTotal = async()=>{
    try {
      const {data} = await axios.get("/product/products-count");
      console.log("shami",data)

      setTotal(data.total)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // ================= FILTER =================
  useEffect(() => {
    if (checked.length || radio.length) {
      loadFilteredProducts();
    } else {
      loadProducts();
    }
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `/product/filtered-products`,
        { checked, radio }
      );
      console.log("filterd prodiucts",data)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= HANDLE CHECKBOX =================
  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // ================= RESET =================
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    loadProducts();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">

        {/* ================= SIDEBAR ================= */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body">

              {/* CATEGORY */}
              <h5 className="fw-bold text-center text-success mb-3">
                🧺 Categories
              </h5>

              <div className="d-flex flex-column gap-2">
                {categories?.map((c) => (
                  <label key={c._id} className="p-2 category-item">
                    <Checkbox
                      onChange={(e) =>
                        handleChecked(e.target.checked, c._id)
                      }
                      checked={checked.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </label>
                ))}
              </div>

              <hr />

              {/* PRICE */}
              <h5 className="fw-bold text-center text-success mb-3">
                💰 Price Range
              </h5>

              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
                className="d-flex flex-column gap-2"
              >
                {prices?.map((p) => (
                  <Radio key={p._id} value={p.array}>
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>

              {/* RESET */}
              <button
                className="btn btn-outline-danger w-100 mt-3"
                onClick={resetFilters}
              >
                Reset Filters
              </button>

            </div>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="col-md-9">

          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <h5>
              🛒 Showing {products.length} Products
            </h5>
          </div>

          <div className="row g-4">
            {products.length > 0 ? (
              products.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))
            ) : (
              <h5 className="text-center text-danger">
                No Products Found 😢
              </h5>
            )}
          </div>

             {/* ================= LOAD MORE ================= */}
          <div className="container text-center mt-4">
  {products && products.length < total && (
    <button
      className="btn btn-warning px-4 py-2 fw-semibold rounded-pill shadow-sm"
      onClick={(e) => {
        e.preventDefault();
        setPage(page + 1);
      }}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2"></span>
          Loading...
        </>
      ) : (
        "Load More"
      )}
    </button>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;