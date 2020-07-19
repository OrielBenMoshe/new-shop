import React, { useState, useEffect } from "react";
import "./product_page.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const [productPage, setProductPage] = useState({});
  const { idParam } = useParams();

  useEffect(() => {
    axios
      .get("https://quilt-flax-chemistry.glitch.me/products/" + idParam)
      .then((res) => {
        setProductPage(res.data);
      });
  }, []);
  // useEffect(() => {
  // }, [productPage]);

  return (
    <div className="productPage">
      <h1>{productPage.title}</h1>
      <img src={productPage.image} alt="no-picure" />
      <div className="quantity">quantity: {productPage.quantity}</div>
      <h2>description:</h2>
      <p>{productPage.description}</p>
    </div>
  );
}

export default ProductPage;
