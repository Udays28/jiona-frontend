import { toast } from 'react-hot-toast';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useProductDetailsQuery } from '../redux/api/productAPI';
import { addToCart } from '../redux/reducer/cartReducer';
import { RootState, server } from '../redux/store';

const ProductDetails = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;

  const { name, stock, photo, price, category, description, size, color } = data?.product!;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: params.id!, photo, name, price, stock, description, size, color, quantity: 1 }));
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="product-details">
      <div className="product-details__image">
        <Zoom>
          <img src={`${server}/${photo}`} alt={name} className="product-image" />
        </Zoom>
      </div>
      <div className="product-details__info">
        <h1 className="product-details__title">{name}</h1>
        <p className="product-details__category">Category: {category}</p>
        <p className="product-details__price">Price: ${price}</p>
        <p className="product-details__stock">Stock: {stock}</p>
        <p className="product-details__description">Description: {description}</p>
        <p className="product-details__size">Size: {size}</p>
        <p className="product-details__color">Color: {color}</p>
        <button className="addToCartButton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
