import { createContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
import { CartItem } from '../types/types';

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  size: string;
  color: string;
  handler: (cartItem: CartItem) => string | undefined;
};

const CartContext = createContext<{ handler: (cartItem: CartItem) => string | undefined } | undefined>(undefined);

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  description,
  size,
  color,
  handler,
}: ProductProps) => {
  return (
    <CartContext.Provider value={{ handler }}>
      <div>
        <Link to={`/product/${productId}`} className="productCard">
          <img src={`${server}/${photo}`} alt={name} />
          <b><p>{name}</p></b>
          <p>{size}</p>
          <p>{color}</p>
          <span>£{price}</span>
        </Link>
        <button
          className="addToCartButton"
          onClick={() =>
            handler({ productId, photo, name, price, stock, description, size, color, quantity: 1 })
          }
        >
          <FaPlus /> Add to cart
        </button>
      </div>
    </CartContext.Provider>
  );
};

export default ProductCard;
export { CartContext };
