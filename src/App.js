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
import ProductPage from "./components/products/product/product_page/product_page";

function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [ProductToCart, setProductToCart] = useState();
  const [productsCount, setProductsCount] = useState(0);

  const addToCart = (pieces, id) => {
    setProductsCount(productsCount + pieces);
    setProductId(id);
    setProductToCart(products.find(() => products.id === productId));
    console.log(ProductToCart);
  };

  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Cart count={productsCount} newProduct={ProductToCart} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Products addToCart={addToCart} />
          </Route>
          <Route path="/Product/:idParam">
            <ProductPage
            // id={product.id}
            // title={product.title}
            // image={product.image}
            // quantity={product.quantity}
            // description={product.description}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
