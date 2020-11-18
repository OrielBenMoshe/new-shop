import React, { useState } from "react";
import "./SearchProduct";
import Button from "@material-ui/core/Button";

const SearchProduct = () => {
  return (
    <Button variant="outlined" className="searchProduct" color="secondary">
      Search a product
    </Button>
  );
};

export default SearchProduct;
