import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <div className="container">
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>About Us</h1>
      </motion.div>
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>Welcome to our clothing e-commerce website. We are dedicated to providing you with the latest fashion trends, high-quality materials, and excellent customer service.</p>
        <p>Our mission is to make you look and feel great in every piece of clothing you wear from our store.</p>
        <p>Thank you for choosing us as your fashion destination.</p>
      </motion.div>
      <motion.div
        className="team"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2>Meet the Team</h2>
        <div className="teamMembers">
          <div className="member">
            <img src="path/to/image1.jpg" alt="Team Member 1" />
            <p>John Doe - CEO</p>
          </div>
          <div className="member">
            <img src="path/to/image2.jpg" alt="Team Member 2" />
            <p>Jane Smith - Designer</p>
          </div>
          <div className="member">
            <img src="path/to/image3.jpg" alt="Team Member 3" />
            <p>Emily Johnson - Marketing</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
