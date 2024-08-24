import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBars,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from '../assets/images/IMG_20240721_123859.png';
import { auth } from "../firebase";
import { useCategoriesQuery } from "../redux/api/productAPI";
import { CartReducerInitialState } from "../types/reducerTypes";
import { User } from "../types/types";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const { data: categoriesResponse, isLoading: loadingcategories, isError } = useCategoriesQuery("");
  const { cartItems } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="Logo" />
        </div>
        
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
    
          <FaBars />
        </div>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to="/search"><FaSearch />Search</Link>
          <Link onClick={() => setMenuOpen(false)} to="/cart">
            <FaShoppingBag />
            {cartItems.length > 0 && <div className="cartQuantity">{cartItems.length}</div>}
             Cart</Link>
          {user?._id ? (
            <>
              <button onClick={() => setIsOpen((prev) => !prev)}><FaUser /></button>
              <dialog open={isOpen}>
                <div>
                  {user.role === "admin" && <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>}
                  <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
                  <button onClick={logoutHandler}><FaSignOutAlt /></button>
                </div>
              </dialog>
            </>
          ) : (
            <Link to="/login"><FaSignInAlt /></Link>
          )}
        </nav>
      </div>
      <div className="categories-container">
        {loadingcategories ? (
          <p>Loading categories...</p>
        ) : isError ? (
          <p>Error loading categories</p>
        ) : (
          categoriesResponse?.categories.map((category) => (
            <Link
              key={category}
              onClick={() => setMenuOpen(false)}
              to={`/category/${category.toLowerCase()}`}
              className="category-link"
            >
              {category.toUpperCase()}
            </Link>
          ))
        )}
      </div>
    </header>
  );
};

export default Header;
