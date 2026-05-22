import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/card/ProductCard';

const CategoryProduct = () => {
    const [products,setProducts] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(params?.slug){
            loadProductByCategory();
            // console.log("hello productcateg",param)
        }

    },[params?.slug]);


    const loadProductByCategory  = async()=>{
        try {
            const {data} = await axios.get(`/product/category/${params.slug}`);
            // console.log("azad",data)
            setProducts(data.products);
            
        } catch (error) {
            console.log(error)
            
        }
    }

 return (
  <div className="container py-4">

    {/* 🔥 Heading */}
    <div className="text-center mb-4">
      <h2 className="fw-bold text-capitalize">
        {params.slug} Products
      </h2>
      <p className="text-muted">Fresh items available in this category</p>
    </div>

    {/* 🔥 Product Grid */}
    <div className="row g-4">
      {products?.length > 0 ? (
        products.map((p) => (
          <div key={p._id} className="col-6 col-md-4 col-lg-3">
            <div className="product-wrapper">
              <ProductCard product={p} />
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-center text-danger">
          No Products Found
        </h5>
      )}
    </div>

  </div>
);
}

export default CategoryProduct