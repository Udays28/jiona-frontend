import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";

const Cart = () => {
  const { cartItems, subtotal, total, tax, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidcouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.error("Stock Limit Reached");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return toast.error("Invalid Operation");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1 className="empty-cart">No Items Added</h1>
        )}
      </main>
      <aside>
        <div className="summary">
          <p>Subtotal: £{subtotal}</p>
          <p>Shipping Charges: £{shippingCharges}</p>
          <p>Tax: £{tax}</p>
          <p>
            Discount: <em> - £{discount}</em>
          </p>
          <p>
            <b>Total: £{total}</b>
          </p>
        </div>

        <input
          type="text"
          value={couponCode}
          placeholder="Enter Coupon Code"
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode && (
          <div className={`coupon-status ${isValidcouponCode ? 'valid' : 'invalid'}`}>
            {isValidcouponCode ? (
              <span className="success">
                £{discount} off using the <code>{couponCode}</code>
              </span>
            ) : (
              <span className="error">
                Invalid Coupon <VscError />
              </span>
            )}
          </div>
        )}

        {cartItems.length > 0 && (
          <Link to="/shipping" className="checkout-button">Proceed to Checkout</Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
