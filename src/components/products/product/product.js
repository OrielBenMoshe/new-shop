import React from "react";
import "./product.css";

class Product extends React.Component {
  state = {
    count: 0,
    quantity: this.props.quantity,
  };

  addToCart = () => {
    console.log(this.state.count);

    this.props.addToCart(this.state.count);
    this.setState(({ quantity }) => ({
      quantity: quantity - this.state.count,
    }));
    this.setState({ count: 0 });
  };

  incrementCount = () => {
    if (this.state.count < this.props.quantity)
      this.setState(({ count }) => ({ count: count + 1 }));
  };
  decrementCount = () => {
    if (this.state.count > 0)
      this.setState(({ count }) => ({ count: count - 1 }));
  };
  render() {
    return (
      <div className="Product">
        <b>{this.props.name}</b>
        <img src={this.props.image} alt="/images/noproduct.png" />
        <div className="quantity">quantity: {this.state.quantity}</div>
        <div>
          <button className="decrement" onClick={this.decrementCount}>
            -
          </button>
          <span className="pieces_count">{this.state.count}</span>
          <button className="increment" onClick={this.incrementCount}>
            +
          </button>
        </div>
        <button className="add_to_cart" onClick={this.addToCart}>
          Add to cart
        </button>
      </div>
    );
  }
}

export default Product;
