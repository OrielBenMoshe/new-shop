import React, { useState, useEffect } from "react";
import "./cart.css";
import Product_in_cart from "./product_in_cart/product_in_cart";

function Cart(props) {
  const productsInCartArray = props.productsInCart;
  useEffect(() => {}, [productsInCartArray]);

  const removeFromCart = (idRemovedProduct, reducedQuantity, reducedPrice) => {
    let reducedCart = productsInCartArray.filter(
      (product) => product.id !== idRemovedProduct
    );
    props.reducedCart(reducedCart, reducedQuantity, reducedPrice);
  };

  return (
    <div className="cart">
      <b>Cart</b>
      <div className="numOfItems">Number of items: {props.numOfItems}</div>
      {productsInCartArray &&
        productsInCartArray.map((productInCart) => (
          <Product_in_cart
            key={productInCart.id}
            id={productInCart.id}
            title={productInCart.title}
            image={productInCart.image}
            price={productInCart.price}
            quantity={productInCart.quantity}
            removeFromCart={removeFromCart}
          />
        ))}
      <b>Total Price: {props.totalPrice}</b>
    </div>
  );
}

export default Cart;
