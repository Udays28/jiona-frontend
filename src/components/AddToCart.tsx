import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const StickyCartButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); // Redirect to the cart page
  };

  return (
    <div className="stickyButton" onClick={handleCartClick}>
      <FaShoppingCart size={24}/>
      Cart
    </div>
  );
};

export default StickyCartButton;
