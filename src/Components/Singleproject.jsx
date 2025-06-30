import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

function Singleproject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
 
  const [currentUser, setCurrentUser] = useState(null);

  const {
    AddtoWishlist,
    addtocartid,
    setAddtocartid,
    Cart,
    setCart,
  } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  async function fetchData(id) {
    const response = await fetch("https://fakestoreapi.com/products/" + id);
    const result = await response.json();
    setProduct(result);
  }
function handleAddCart() {
  if (!currentUser) {
    navigate(`/login?referer=${encodeURIComponent(location.pathname)}`);
    return;
  }

  if (id && !disabled) {
    setDisabled(true);
    setCart(Cart + 1);
    setAddtocartid([...addtocartid, id]);
    navigate("/cart");
  }
}




  return (
    <div className="flex">
      <div className="set">
        <img src={product.image} alt="" className="img" />
      </div>
      <div className="set1">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h1>Price:-${product.price}</h1>

        <button className="btn1" onClick={handleAddCart} disabled={disabled}>
          Add TO Cart
        </button>

        <button
          className="btn2"
      
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}

export default Singleproject;
