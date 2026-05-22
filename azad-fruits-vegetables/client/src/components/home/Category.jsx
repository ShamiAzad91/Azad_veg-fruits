import React from "react";
import fruits_img from "../../assets/fruits.jpg";
import vegetables_img from "../../assets/vegetables.jpg";
import leafy_img from "../../assets/leafy.jpg";
import seasonal_img from "../../assets/sesonal.jpg";
import useCategory from "../../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const categories = useCategory();
  const navigate = useNavigate();

  const images = [
    leafy_img,
    seasonal_img,
    fruits_img,
    vegetables_img,
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="shop-heading">Shop by Category</h2>
          <p className="text-muted">
            Fresh & quality products just for you
          </p>
        </div>

        <div className="row g-4">
          {categories?.length > 0 ? (
            categories.slice(0, 4).map((c, index) => (
              <div
                key={c._id}
                className="col-6 col-md-4 col-lg-3"
              >
                <div
                  className="category-card"
                  onClick={() =>
                    navigate(`/category/${c.slug}`)
                  }
                  style={{
                    backgroundImage: `url(${
                      images[index % images.length]
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "220px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "0.3s ease",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "15px",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "20px",
                      background:
                        "rgba(0,0,0,0.4)",
                      padding: "8px 14px",
                      borderRadius: "10px",
                    }}
                  >
                    {c.name}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>Loading categories...</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;