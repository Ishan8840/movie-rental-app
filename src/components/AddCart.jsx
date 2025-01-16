import { useStoreContext } from "../context/Context";
import { useNavigate } from "react-router";
import '../components/AddCart.css';

function AddToCartButton({ movie, variant }) {
  const navigate = useNavigate();
  const { cart, setCart, user, purchases } = useStoreContext();

  const handleAddToCart = () => {
    if (user) {
      if (purchases.has(movie.id)) {
        return
      } else {
        const newCart = cart.has(movie.id)
          ? cart.delete(movie.id)
          : cart.set(movie.id, movie);

        localStorage.setItem(user.uid, JSON.stringify(newCart.toJS()));
        setCart(newCart);
      }

    } else {
      navigate('/signin');
    }
  };

  const buttonText = () => {
    if (cart.has(movie.id)) {
      return "Added";
    } else if (purchases.has(movie.id)) {
      return "Purchased";
    } else {
      return "Add To Cart";
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`add-to-cart-button ${variant ? variant : ""}`}
    >
      {buttonText()}
    </button>
  );
}

export default AddToCartButton;