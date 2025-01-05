import { useStoreContext } from "../context/Context";
import { useNavigate } from "react-router";
import '../components/AddCart.css';

function AddToCartButton({ movie, variant }) {
  const navigate = useNavigate();
  const { cart, setCart, signedIn } = useStoreContext();

  const handleAddToCart = () => {
    if (signedIn) {
      const updatedCart = cart.has(movie.id)
        ? cart.delete(movie.id)
        : cart.set(movie.id, movie);
      setCart(updatedCart);
    } else {
      navigate('/signin');
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`add-to-cart-button ${variant ? variant : ""}`}
    >
      {cart.has(movie.id) ? "Added" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;