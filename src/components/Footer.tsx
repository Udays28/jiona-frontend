import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h4>About Us</h4>
          <p>Learn more about our story and how we started.</p>
        </div>
        <div className="footer__section">
          <h4>Contact</h4>
          <p>Email: contact@jionafashion.com</p>
          <p>Phone: +447909707271</p>
        </div>
        <div className="footer__section">
          <h4>Follow Us</h4>
          <div className="footer__social">
            <a href="https://www.facebook.com/profile.php?id=61564455922989&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://youtube.com/@jionafashion9678?si=yco-t5qxFyO3-J5t" target="_blank" rel="noopener noreferrer">Youtube</a>
            <a href="https://www.instagram.com/jionafashion?utm_source=qr&igsh=aG10ZmhjNzg4Z3Ji" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Jiona Fashion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
