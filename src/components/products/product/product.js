import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
} from "react-router-dom";
import "./product.css";

// The Product Component.
const Product = (props) => {
  //Variables.
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(props.quantity);
  const [product, setProduct] = useState([]);

  // Add to cart function.
  const addToCart = () => {
    if (quantity > 0) {
      props.addToCart(count, props.id);
      setQuantity(quantity - count);
      setCount(0);
    }
  };
  //Increment pieces function.
  const incrementCount = () => {
    if (count < quantity) setCount(count + 1);
  };
  //Decrement pieces function.
  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="Product">
      <b>{props.title}</b>

      {/* link for product page. */}
      <Link to={"/product/" + props.id}>
        <img src={props.image} alt="/images/noproduct.png" />
      </Link>

      <div className="price">price: {props.price}</div>
      <div className="quantity">quantity: {quantity}</div>
      <div
        style={quantity ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <button className="decrement" onClick={decrementCount}>
          -
        </button>
        <span className="pieces_count">{count}</span>
        <button className="increment" onClick={incrementCount}>
          +
        </button>
      </div>
      <Button
        className="add_to_cart"
        onClick={addToCart}
        variant="text"
        color="primary"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
