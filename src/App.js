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
  const [productsInCart, setProductsInCart] = useState([]);
  const [rangeValue, setRangeValue] = useState([0, 100]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);

  const addToCart = (productToCart) => {
    // Find the index of product that already exist in the cart.
    const findifProductExistInCart = (product) => {
      return product.id === productToCart.id;
    };
    let productIndex = productsInCart.findIndex(findifProductExistInCart);
    // Add to Cart product according to the situation, whether it exists or not.
    if (productIndex < 0)
      setProductsInCart((productsInCart) => [...productsInCart, productToCart]);
    else {
      let newProductsInCart = productsInCart.map((product) => {
        if (product.id === productToCart.id) {
          product.quantity += productToCart.quantity;
          product.price += productToCart.price;
        }
        return product;
      });
      setProductsInCart(newProductsInCart);
    }
    setTotalPrice((totalPrice) => totalPrice + productToCart.price);
    setNumOfItems((numOfItems) => numOfItems + productToCart.quantity);
  };

  // Reduce from the cart the removed product and change accordingly the total price and the num of items.
  const reducedCart = (reducedCartArray, reducedQuantity, reducedPrice) => {
    setProductsInCart(reducedCartArray);
    setTotalPrice((totalPrice) => totalPrice - reducedPrice);
    setNumOfItems((numOfItems) => numOfItems - reducedQuantity);
  };

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
          productsInCart={productsInCart}
          totalPrice={totalPrice}
          numOfItems={numOfItems}
          reducedCart={reducedCart}
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
