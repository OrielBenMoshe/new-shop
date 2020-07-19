import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
} from "react-router-dom";

import "./App.css";
import Header from "./components/header/header";
import Cart from "./components/cart/cart";
import Products from "./components/products/products";
import ProductPage from "./pages/product_page/product_page";

function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [ProductToCart, setProductToCart] = useState({});
  const [productsCount, setProductsCount] = useState(0);
  const [rangeValue, setRangeValue] = useState([0, 100]);
  const addToCart = (pieces, id) => {
    setProductsCount(productsCount + pieces);
    setProductId(id);
    axios
      .get("https://handsomely-maze-stoat.glitch.me/products/" + id)
      .then((res) => {
        setProductToCart(res.data);
      });

    // setProductToCart(products.find(() => products.id === productId));
  };

  // useEffect(() => {
  //   console.log(ProductToCart);
  // }, [ProductToCart]);
  const range = (value) => {
    setRangeValue(value);
  };
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  const minMax = (min, max) => {
    setMin(min);
    setMax(max);
  };
  return (
    <div className="App">
      <Header range={range} min={min} max={max} />
      <Router>
        <Cart
          count={productsCount}
          newProduct={ProductToCart ? ProductToCart : ""}
        />

        <Switch>
          <Route exact path="/">
            <Products
              addToCart={addToCart}
              range={rangeValue}
              minMax={minMax}
            />
          </Route>
          <Route path="/Product/:idParam">
            <ProductPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
