import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./products.css";
import { productsArray } from "./mocks/products.mock";
import Product from "./product/product";
import axios from "axios";

const Products = (props) => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const addToCart = (count, id) => {
    props.addToCart(count, id);
  };

  return (
    <div className="Products">
      <Link to="/">
        <div>Products</div>
      </Link>

      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          quantity={product.quantity}
          addToCart={addToCart}
          // idResult={idResult}
        />
      ))}
    </div>
  );
};

export default Products;
