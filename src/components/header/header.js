import React, { useState, useEffect } from "react";
import "./header.css";
import { Slider, Button } from "antd";

function Header(props) {
  const marks = {
    // 0: props.min,
    // 100: props.max,
  };
  const [products, setProducts] = useState([]);

  const range = (value) => {
    props.range(value);
  };

  useEffect(() => {}, []);

  return (
    <header className="Header">
      <Slider
        className="slider"
        // marks={marks}
        max={props.max}
        min={props.min}
        included="false"
        range
        onChange={range}
        // defaultValue={[0, 500]}
      />
    </header>
  );
}

export default Header;
