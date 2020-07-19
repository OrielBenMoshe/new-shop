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

  const filteredProducts = (products) => {
    return products.filter(
      (product) =>
        product.price >= props.range[0] && product.price <= props.range[1]
    );
  };

  return (
    <div className="Products">
      <div className="title">Products</div>

      {filteredProducts(products).map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          quantity={product.quantity}
          addToCart={addToCart}
          // idResult={idResult}
        />
      ))}
    </div>
  );
};

export default Products;
