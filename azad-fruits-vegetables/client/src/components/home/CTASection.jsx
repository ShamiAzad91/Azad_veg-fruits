import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-5 cta-section">
      <div className="container text-center">

        {/* Heading */}
        <h2 className="cta-heading">
          Order Fresh Fruits & Vegetables Today
        </h2>

        {/* Sub text */}
        <p className="cta-text">
          Fresh from local market • Best prices • Trusted quality
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">

          {/* Shop Page */}
          <Link to="/shop" className="btn btn-success btn-lg">
            🛒 Shop Now
          </Link>

          {/* Call */}
          <a href="tel:9876543210" className="btn btn-outline-success btn-lg">
            📞 Call Now
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-success btn-lg"
          >
            💬 WhatsApp Order
          </a>

        </div>

      </div>
    </section>
  );
};

export default CTASection;
