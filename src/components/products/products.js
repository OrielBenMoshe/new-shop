import React, { useState, useEffect, useContext } from "react";
import "./products.css";
import Product from "./product/product";
import axios from "axios";
import { Slider, Col, Row, Table } from "antd";
import socketIoClient from "socket.io-client";
import SearchProduct from "./searchProduct/SearchProduct";
import ProductsContext from "./../../ProductsContext";

const Products = (props) => {
  const products = useContext(ProductsContext).data;
  const [sliderRange, setSliderRange] = useState([0, 0]);
  // const [min, setMin] = useState();
  // const [max, setMax] = useState();

  const range = (value) => {
    setSliderRange(value);
  };

  // The marks on the edges of the slider.
  const marks = {
    [sliderRange[0]]: { label: <h3>{sliderRange[0]}</h3> },
    [sliderRange[1]]: { label: <h3>{sliderRange[1]}</h3> },
  };

  const addToCart = (productToCart) => {
    props.addToCart(productToCart);
  };

  const deleteProduct = (productKey) => {
    axios.delete("http://127.0.0.1:7000/products/" + productKey);
  };

  const filteredProducts = (products) => {
    return products.filter(
      (product) =>
        product.price >= sliderRange[0] && product.price <= sliderRange[1]
    );
  };

  const productsComponents = products.map((product) => (
    <Product
      key={product.key}
      productKey={product.key}
      title={product.title}
      image={product.image}
      price={product.price}
      quantity={product.quantity}
      addToCart={addToCart}
      delete={deleteProduct}
      isAdmin={props.path === "/admin"}
    />
  ));

  useEffect(() => {
    //Set a range to the slider.
    let priceRange = [0, 0];
    products.forEach((product) => {
      if (product.price < priceRange[0] || !priceRange[0])
        priceRange[0] = product.price;

      if (product.price > priceRange[1] || !priceRange[1])
        priceRange[1] = product.price;
    });

    setSliderRange(priceRange);
  }, []);

  return (
    <div className="Products">
      <Row>
        <SearchProduct />
      </Row>

      <Row>
        <Col span={3}>
          <h2>Filter by price:</h2>
        </Col>
        <Col>
          {/* {min && max && ( */}
          <Slider
            range
            className="slider"
            marks={marks}
            defaultValue={[13, 500]}
            min={sliderRange[0]}
            max={sliderRange[1]}
            // included="false"
            //onAfterChange={range}
            tooltipVisible
          />
          {/* )} */}
        </Col>
      </Row>
      <div className="title">Products</div>

      {/* {props.path === "/admin" ? (
        <EditProductsTable productsList={products} />
      ) : ( */}
      {productsComponents}
      {/* )} */}

      {/* {products.length > 0 ? (
        // filteredProducts(products).map((product) => (
        //   <Product
        //     key={product.id}
        //     id={product.id}
        //     title={product.title}
        //     image={product.image}
        //     price={product.price}
        //     quantity={product.quantity}
        //     addToCart={addToCart}
        //   />
        // ))
        products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            quantity={product.quantity}
            addToCart={addToCart}
          />
        ))
      ) : (
        <h1>Loading...</h1>
      )} */}
    </div>
  );
};

export default Products;
