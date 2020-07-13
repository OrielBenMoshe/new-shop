import React, { Component } from "react";
import "./products.css";
import { productsArray } from "./mocks/products.mock";
import Product from "./product/product";
import Cart from "./cart/cart";

class Products extends Component {
  state = { productsArray, count: 0 };

  addToCart = (pieces) => {
    console.log(pieces);

    this.setState(({ count }) => ({ count: count + pieces }));
  };

  render() {
    return (
      <div className="Products">
        <div>Products</div>
        <Cart count={this.state.count} />
        {this.state.productsArray.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            image={product.image}
            quantity={product.quantity}
            addToCart={this.addToCart}
          />
        ))}
      </div>
    );
  }
}

export default Products;
