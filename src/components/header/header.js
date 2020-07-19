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
      {props.min && props.max && (
        <Slider
          className="slider"
          // marks={marks}
          defaultValue={[props.min, props.max]}
          max={props.max}
          min={props.min}
          included="false"
          range
          onChange={range}
          tooltipVisible
          // defaultValue={[0, 500]}
        />
      )}
    </header>
  );
}

export default Header;
