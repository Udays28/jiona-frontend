import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
      </div>
      <div className="contact-cards">
        <div className="contact-card">
          <h2>Customer Service</h2>
          <p>Email: contact@jionafashion.com</p>
          <p>Phone: 00447909707271
</p>
        </div>
        {/* <div className="contact-card">
          <h2>Technical Support</h2>
          <p>Email: techsupport@example.com</p>
          <p>Phone: (123) 456-7891</p>
        </div>
        <div className="contact-card">
          <h2>Sales Inquiries</h2>
          <p>Email: sales@example.com</p>
          <p>Phone: (123) 456-7892</p>
        </div> */}
      </div>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
