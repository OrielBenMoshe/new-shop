import React, { useState } from "react";
import "./cart.css";
import Product_in_cart from "./product_in_cart/product_in_cart";

function Cart(props) {
  // const [product, setProduct] = useState(props.newProduct);
  const [newProduct, setNewProduct] = useState(props.newProduct);
  return (
    <div className="cart">
      <b>Cart</b>
      <div className="count">count: {props.count}</div>
      {props.newProduct !== "" ? (
        <Product_in_cart title={newProduct.title} image={newProduct.image} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Cart;
