import React, { useState } from "react";
import "./product_in_cart.css";

function Product_in_cart(props) {
  const removeFromCart = () => {
    props.removeFromCart(props.id, props.quantity, props.price);
  };
  return (
    <div className="product_in_cart">
      <img src={props.image} />

      <b>{props.title}</b>
      <div>Quantity: {props.quantity}</div>
      <div>Price: {props.price}</div>
      <button onClick={removeFromCart}>Remove</button>
    </div>
  );
}

export default Product_in_cart;
