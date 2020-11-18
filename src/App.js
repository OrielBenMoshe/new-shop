import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { ProductsProvider } from "./ProductsContext";
import { Row, Col } from "antd";

//Components import/
import Header from "./components/header/header";
import Cart from "./components/cart/cart";
import Products from "./components/products/products";
import ProductPage from "./pages/product_page/product_page";
import EditableProductsTable from "./components/adminPage/EditableProductsTable";

import ModalAddProduct from "./components/addProduct/ModalAddProduct";

function App() {
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);

  const [products, setProducts] = useState([]);
  const providerOptions = {
    data: products,
    changeProducts: (value) => setProducts(value),
  };

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

  //Adding the news pruducts to product inventory.
  const addingProducts = async (productsAdded) => {
    console.log("productsAdded", productsAdded);
    productsAdded.length > 0 &&
      (await axios.post("http://127.0.0.1:7000/products", productsAdded));
  };

  const postData = async () => {
    await axios.post("http://127.0.0.1:7000/products", products);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://127.0.0.1:7000/products");
      setProducts(res.data);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Row>
          <Col span={24}>
            <Header />
          </Col>
        </Row>

        <ProductsProvider value={providerOptions}>
          <Row>
            <Switch>
              <Route exact path="/">
                <Col span={18}>
                  <Products
                    addToCart={addToCart}
                    path="/"
                    // productInventory={productInventory}
                  />
                </Col>
                <Col span={6}>
                  <Cart
                    productsInCart={productsInCart}
                    totalPrice={totalPrice}
                    numOfItems={numOfItems}
                    reducedCart={reducedCart}
                  />
                </Col>
              </Route>

              <Route path="/Product/:idParam">
                <Col span={18}>
                  <ProductPage />
                </Col>
                <Col span={6}>
                  <Cart
                    productsInCart={productsInCart}
                    totalPrice={totalPrice}
                    numOfItems={numOfItems}
                    reducedCart={reducedCart}
                  />
                </Col>
              </Route>
            </Switch>

            <Route path="/admin">
              <Col span={24}>
                <EditableProductsTable postData={postData} />
              </Col>
              {/* <Col span={18}>
              <Products addToCart={addToCart} path="/admin" />
            </Col>

            <Col span={6}>
              <ModalAddProduct addingProducts={addingProducts} />
            </Col> */}
            </Route>
          </Row>
        </ProductsProvider>
      </Router>
    </div>
  );
}

export default App;
