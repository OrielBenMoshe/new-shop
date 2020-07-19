import React from "react";
import "./header.css";
import { Slider, Button } from "antd";

function Header(props) {
  const marks = {
    0: "0",
    100: "100",
  };

  const range = (value) => {
    props.range(value);
  };

  return (
    <header className="Header">
      <Slider
        className="slider"
        marks={marks}
        max="100"
        included="false"
        range
        onChange={range}
        // defaultValue={[0, 500]}
      />
    </header>
  );
}

export default Header;
