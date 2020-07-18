import React from "react";
import "./cart.css";

function Cart(props) {
  console.log(props);
  // const [product, setProduct] = useState(props.newProduct);

  return (
    <div className="cart">
      <b>Cart</b>
      <div className="count">count: {props.count}</div>
      {/* <div className="products_in_cart">
        <div className="product_in_cart">
          <b>{product.title}</b>
          <img src={product.image} />
          <div>Quantity: {product.quantity}</div>
        </div>
      </div> */}
    </div>
  );
}

export default Cart;
