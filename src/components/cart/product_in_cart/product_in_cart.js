import React, { useState } from "react";
import "./product_in_cart.css";

function Product_in_cart(props) {
  return (
    <div className="product_in_cart">
      <b>{props.title}</b>
      <img src={props.image} />
      <div>Quantity: {props.quantity}</div>
    </div>
  );
}

export default Product_in_cart;
