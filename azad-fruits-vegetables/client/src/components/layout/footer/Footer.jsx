import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-light pt-5"
      style={{
        background: "linear-gradient(135deg, #1b5e20, #388e3c)",
      }}
    >
      <div className="container">
        <div className="row align-items-start">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">🥬 Azad Veg & Fruits</h4>
            <p className="small mt-2">
              Fresh vegetables & fruits directly from the market.
              Quality you can trust, prices you’ll love.
            </p>

            <span className="badge bg-warning text-dark me-2">Fresh</span>
            <span className="badge bg-light text-success">Daily Stock</span>
          </div>

          {/* Navigation */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/shop" className="text-light text-decoration-none">
                  Shop
                </a>
              </li>
              <li className="mb-2">
                <a href="/categories" className="text-light text-decoration-none">
                  Categories
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Why Choose Us</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">✔ Fresh & Hygienic</li>
              <li className="mb-2">✔ Best Market Price</li>
              <li className="mb-2">✔ Fast Local Delivery</li>
              <li>✔ Trusted by Families</li>
            </ul>
          </div>

          {/* Contact + CTA */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Order Now</h6>
            <p className="small mb-1">📍Jora Talab,Bariatu, Ranchi Jharkhand</p>
            <p className="small mb-3">📞 +91 9708177711</p>

           
           
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="text-center mt-4 py-3 small"
          style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
        >
          © {new Date().getFullYear()} Azad Veg & Fruits • Freshness Delivered Daily
        </div>
      </div>
    </footer>
  );
};

export default Footer;
