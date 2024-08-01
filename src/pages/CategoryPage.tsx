import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonLoader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { CustomError } from "../types/apiTypes";
import { CartItem } from "../types/types";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const priceParam = new URLSearchParams(window.location.search).get("price");
  const price = priceParam ? parseFloat(priceParam) : 0;

  // Fetch products based on the category
  const { data, isLoading, isError, error } = useSearchProductsQuery({
    category: category || "", // Default to an empty string if undefined
    search: "",
    price, // Pass as number
    sort: "",
    page,
  });

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");

    dispatch(addToCart(cartItem));
    const index = cartItems.findIndex(
      (i) => i.productId === cartItem.productId
    );
    if (index !== -1) return toast.error("Already in cart");

    toast.success("Added to cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < data?.totalPage!;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="category-page">
      <header className="category-page-header">
        <h1>{category?.toUpperCase()}</h1>
      </header>
      <main className="category-page-main">
        {isLoading ? (
          <SkeletonLoader width="100%" />
        ) : (
          <div className="product-grid">
            {data?.products.map((i) => (
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
            ))}
          </div>
        )}

        {data && data.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {data.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
