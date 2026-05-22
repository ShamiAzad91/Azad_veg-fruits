import React from 'react'

const Feature = () => {
    return (
    <section className="py-5">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="shop-heading">Why Choose Us</h2>
          <p className="text-muted">
            Freshness, quality & trust delivered daily
          </p>
        </div>

        {/* Features */}
        <div className="row g-4 text-center">

          <div className="col-6 col-md-3">
            <div className="feature-card">
              <div className="feature-icon">🥬</div>
              <h5>Farm Fresh</h5>
              <p>Fresh vegetables & fruits directly from market</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h5>Fast Delivery</h5>
              <p>Quick delivery in your local area</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h5>Best Prices</h5>
              <p>Affordable prices without compromise</p>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h5>Trusted Shop</h5>
              <p>Serving local customers with honesty</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Feature