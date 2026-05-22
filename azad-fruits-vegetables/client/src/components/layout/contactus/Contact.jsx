import React from "react";

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "linear-gradient(90deg,#2e7d32,#66bb6a)" }}
      >
        <h1 className="fw-bold">Contact Us</h1>
        <p>We’d love to hear from you</p>
      </section>

      {/* Contact Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            
            {/* Contact Form */}
            <div className="col-md-6">
              <h4 className="mb-3">Send Message</h4>
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                />
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
                <button className="btn btn-success w-100">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-md-6">
              <h4 className="mb-3">Contact Details</h4>
              <p><strong>Shop Name:</strong> Azad Veg & Fruits</p>
              <p><strong>Phone:</strong> +91 9708177711</p>
              <p><strong>Email:</strong> azadveg@gmail.com</p>
              <p><strong>Address:</strong> Jora Talab,Bariatu ,Ranchi Jharkhand</p>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
     {/* Google Map */}
<section className="mt-5">
  <div className="container-fluid px-0">
    <div style={{ width: "100%", height: "350px" }}>
      <iframe
        title="Office Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d915.485530428417!2d85.3484816695713!3d23.390310998682374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1c3cfe7c2e3%3A0x4ccd041f6de24e91!2sAlam%20Masjid!5e0!3m2!1sen!2sin!4v1770704127280!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>

    </div>
  );
};

export default Contact;
