import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
        
      <div id='contact' className="contact-wrapper">
        <div className="contact-info">
           <h2>Get in Touch with <span>Find My Property</span></h2>
          <p>Have questions, feedback, or need help finding the perfect property? Reach out and our team will respond within 24 hours.</p>

          <ul>
            <li>📞 +91 98765 43210</li>
            <li>📧 support@findmyproperty.in</li>
            <li>📍 Bengaluru, India</li>
          </ul>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message 🚀</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
