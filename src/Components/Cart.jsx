import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

function Cart() {
  const { addtocartid, setAddtocartid, Cart, setCart, Quantity, setQuantity } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch product data for items in the cart
  useEffect(() => {
    async function fetchData() {
      if (addtocartid.length === 0) return;

      const results = await Promise.all(
        addtocartid.map(async (id) => {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          return await response.json();
        })
      );

      // Initialize quantities if not already set
      const newQuantities = {};
      results.forEach((item) => {
        if (!Quantity[item.id]) newQuantities[item.id] = 1;
      });
      setQuantity((prev) => ({ ...prev, ...newQuantities }));

      setProducts(results);
    }

    fetchData();
  }, [addtocartid]);

  // Handle quantity increase
  function increment(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

  // Handle quantity decrease (min 1)
  function decrement(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  }

  // Remove product from cart
  function removeFromCart(index, productId) {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);

    const updatedIds = [...addtocartid];
    updatedIds.splice(index, 1);
    setAddtocartid(updatedIds);

    setCart(Cart - 1);

    // Remove quantity entry
    const updatedQuantities = { ...Quantity };
    delete updatedQuantities[productId];
    setQuantity(updatedQuantities);
  }

  // Calculate total amount when products or quantity change
  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      const qty = Quantity[item.id] || 1;
      total += item.price * qty;
    });
    setTotalAmount(total);
  }, [products, Quantity]);

  if (addtocartid.length === 0) {
    return <h1 className="EmptyCard">🛒 Cart is empty</h1>;
  }

  return (
    <div style={{marginTop:"7%"}}>
      {products.map((item, index) => (
        <div key={item.id} className="cartflex">
          <div className="cartimg">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="ratelist">
            <h2>{item.title}</h2>
            <h3>Price: ${item.price}</h3>
            <h3>Rating: {item.rating?.rate}</h3>
            <h3>Count: {item.rating?.count}</h3>
            <div className="marginCartquantity">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{Quantity[item.id] || 1}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
          </div>
          <div>
            <span>Remove: </span>
            <button onClick={() => removeFromCart(index, item.id)}>&times;</button>
          </div>
        </div>
      ))}
      <hr />
      <span>GRAND TOTAL: $ {totalAmount.toFixed(2)}</span>
    </div>
  );
}

export default Cart;
