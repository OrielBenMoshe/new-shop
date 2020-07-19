import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./products.css";
import { productsArray } from "./mocks/products.mock";
import Product from "./product/product";
import axios from "axios";

const Products = (props) => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  useEffect(() => {
    let min;
    let max;
    axios
      .get("https://handsomely-maze-stoat.glitch.me/products")
      .then((res) => {
        setProducts(res.data);
        res.data.forEach((product) => {
          if (min > product.price || !min) min = product.price;

          if (max < product.price || !max) max = product.price;
        });
        props.minMax(min, max);
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
        />
      ))}
    </div>
  );
};

export default Products;
