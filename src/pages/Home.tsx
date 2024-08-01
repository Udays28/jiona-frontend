import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery, useProductsByCategoryQuery } from "../redux/api/productAPI"; // Update to include category query
import { addToCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import ImageSlider from "../components/Slider";

const Home = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const { data: latestData, isLoading: isLatestLoading, isError: isLatestError } = useLatestProductsQuery("");
  const { data: menData, isLoading: isMenLoading, isError: isMenError } = useProductsByCategoryQuery("men"); 
  const { data: womenData, isLoading: isWomenLoading, isError: isWomenError } = useProductsByCategoryQuery("women"); 
  const { data: girlData, isLoading: isgirlLoading, isError: isgirlError } = useProductsByCategoryQuery("girls"); 

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");

    dispatch(addToCart(cartItem));
    const index = cartItems.findIndex(
      (i) => i.productId === cartItem.productId
    );
    if (index !== -1) return toast.error("Already in cart");

    toast.success("Added to cart");
  };

  if (isLatestError || isMenError || isWomenError|| isgirlError) toast.error("Cannot fetch the products");

  return (
    <>
      <div className="App">
        <header className="App-header">
          <ImageSlider />
        </header>
      </div>
      <div className="home">
        <h1>
          Latest Products
          <Link to={"/search"} className="findmore">
            More
          </Link>
        </h1>
        <main>
          {isLatestLoading ? (
            <SkeletonLoader width="80vw" />
          ) : (
            latestData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
                description={i.description}
                size={i.size}
                color={i.color}
              />
            ))
          )}
        </main>
        <h1>Men's Products</h1>
        <main>
          {isMenLoading ? (
            <SkeletonLoader width="80vw" />
          ) : (
            menData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
                description={i.description}
                size={i.size}
                color={i.color}
              />
            ))
          )}
        </main>
        <h1>Women's Products</h1>
        <main>
          {isWomenLoading ? (
            <SkeletonLoader width="80vw" />
          ) : (
            womenData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
                description={i.description}
                size={i.size}
                color={i.color}
              />
            ))
          )}
        </main>
        <h1>Girl's Products</h1>
        <main>
          {isgirlLoading ? (
            <SkeletonLoader width="80vw" />
          ) : (
            girlData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
                description={i.description}
                size={i.size}
                color={i.color}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
