import { useStoreContext } from "../context/Context.jsx";
import { useNavigate } from "react-router";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "./CartView.css";

function CartView() {
  const navigate = useNavigate();
  const { cart, setCart } = useStoreContext();

  return (
    <div className="cart-view">
      <Header />
      {cart.size > 0 ? (
        <div className="cart-items">
          {
            cart.entrySeq().map(([key, value]) => (
              <div className="cart-item" key={key}>
                <img
                  className="cart-item-img"
                  src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                  alt={value.title}
                  onClick={() => navigate(`/movies/details/${value.id}`)}
                />
                <div className="cart-item-details">
                  <h2 className="cart-item-title">{value.title}</h2>
                  <p className="cart-item-description">
                    {value.overview}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => setCart((prevCart) => prevCart.delete(key))}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty. Add some movies!</p>
      )}

      {cart.size > 0 && (
        <div className="checkout-container">
          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </div>
      )}
      <div className="footer-height">
        <Footer />
      </div>
    </div>
  );
}

export default CartView;
