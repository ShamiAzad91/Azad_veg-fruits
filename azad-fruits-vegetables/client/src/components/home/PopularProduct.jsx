import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../card/ProductCard";

const PopularProduct = () => {
  const [products, setProducts] = useState([]);

  // API call
  const getPopularProducts = async () => {
    try {
      const { data } = await axios.get("/product/popular");

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularProducts();
  }, []);

  // split products into groups of 4
  const chunkProducts = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const slides = chunkProducts(products, 4);

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-4">
          <h2 className="shop-heading">Popular Products</h2>
          <p className="text-muted">Best selling items</p>
        </div>

        <div
          id="popularCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            {slides.map((slide, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="row g-4">
                  {slide.map((item) => (
                    <div className="col-6 col-md-3" key={item._id}>
                     <ProductCard product={item} showHomeButton={true} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#popularCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#popularCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default PopularProduct;