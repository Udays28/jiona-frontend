import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/images/second.jpeg';
import image2 from '../assets/images/first.jpeg';

const typingAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const AboutUs: React.FC = () => {
  const headerText = "About Us";
  const contentText = [
    "Welcome to our clothing e-commerce website. We are dedicated to providing you with the latest fashion trends, high-quality materials, and excellent customer service.",
    "Our mission is to make you look and feel great in every piece of clothing you wear from our store.",
    "Thank you for choosing us as your fashion destination."
  ];

  return (
    <motion.div
      className="aboutUsContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="header"
        initial="hidden"
        animate="visible"
      >
        <h1>
          {headerText.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={typingAnimation}
              className="letter"
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      
      <motion.div
        className="content"
        initial="hidden"
        animate="visible"
      >
        {contentText.map((sentence, idx) => (
          <p key={idx}>
            {sentence.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index + idx * 100} // Staggering each sentence
                variants={typingAnimation}
                className="letter"
              >
                {char}
              </motion.span>
            ))}
          </p>
        ))}
      </motion.div>
      
      <motion.div
        className="team"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2>Meet the Team</h2>
        <div className="teamMembers">
          <motion.div
            className="member"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={image2} alt="Mariamma George (Jolly George)" />
            <p>Mariamma George (Jolly George)</p>
          </motion.div>
          <motion.div
            className="member"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={image1} alt="Georgekutty Varghese" />
            <p>Georgekutty Varghese</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
