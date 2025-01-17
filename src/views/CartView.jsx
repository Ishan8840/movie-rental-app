import { useStoreContext } from "../context/Context.jsx";
import { useNavigate } from "react-router";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./CartView.css";

function CartView() {
  const navigate = useNavigate();
  const { cart, setCart, user, setPurchases, purchases, genres } = useStoreContext();

  const removeMovie = (key) => {
    setCart((prevCart) => {
      const newCart = prevCart.delete(key);
      localStorage.setItem(user.uid, JSON.stringify(newCart.toJS()));
      return newCart;
    });
  };

  const purchaseMovie = async () => {

    const updatedPurchases = purchases.merge(cart);
    setPurchases(updatedPurchases);

    try {
      const docRef = doc(firestore, "users", user.uid);
      await updateDoc(docRef, { purchases: updatedPurchases.toJS(), });
      const clearedCart = cart.clear();
      setCart(clearedCart);
      localStorage.setItem(user.uid, JSON.stringify(clearedCart.toJS()));
    } catch (error) {
      alert(error);
    }
    alert('Movies Purchased!');
  };


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
                    onClick={() => removeMovie(key)}
                  >
                    <i className="fa-solid fa-trash"></i>
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
          <button className="checkout-button" onClick={purchaseMovie}>
            Checkout
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
