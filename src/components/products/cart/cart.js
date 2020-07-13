import React from "react";
import "./cart.css";

function Cart(props) {
  return (
    <div className="cart">
      <b>Cart</b>
      <div className="count">count: {props.count}</div>
    </div>
  );
}

export default Cart;
