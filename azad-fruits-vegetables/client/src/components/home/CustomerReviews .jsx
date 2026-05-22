import React from "react";
import customer1 from "../../assets/customer_image/customer1.jpg";
const reviews = [
  {
    name: "Ramesh",
    text: "Fresh vegetables daily and fair prices. Very satisfied.",
    rating: 5,
    img: customer1
  },
  {
    name: "Sunita",
    text: "Good quality fruits and fast service. Highly recommended.",
    rating: 5,
    img: customer1,
  },
  {
    name: "Zaid",
    text: "Clean shop, honest pricing, and friendly behaviour.",
    rating: 4,
    img: customer1,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-5">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="shop-heading">What Our Customers Say</h2>
          <p className="text-muted">
            Trusted by local customers every day
          </p>
        </div>

        {/* Reviews */}
        <div className="row g-4 justify-content-center">
          {reviews.map((review, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="review-card">

                {/* Customer Image */}
                <img
                  src={review.img}
                  alt={review.name}
                  className="customer-img"
                />

                {/* Stars */}
                <div className="stars mb-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                {/* Review text */}
                <p className="review-text">“{review.text}”</p>

                {/* Name */}
                <h6 className="review-name">— {review.name}</h6>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
