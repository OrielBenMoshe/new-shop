import React, { useState, useContext } from "react";
import MaterialTable from "material-table";
import ProductsContext from "./../../ProductsContext";

export default function EditableProductsTable(props) {
  const columns = [
    { title: "Key", field: "key" },
    { title: "Title", field: "title" },
    {
      title: "Image",
      field: "image",
      render: (rowData) => <img style={{ height: 45 }} src={rowData.image} />,
    },
    { title: "Quantity", field: "quantity", type: "numeric" },
    { title: "Price", field: "price", type: "numeric" },
    { title: "Description", field: "description" },
  ];
  const products = useContext(ProductsContext).data;
  const changeProducts = useContext(ProductsContext).changeProducts;

  return (
    <MaterialTable
      title="Products in stock"
      columns={columns}
      data={products}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();

              changeProducts((products) => {
                const data = [...products];
                data.push(newData);
                props.postData();
                return data;
              });

              //   setState((prevState) => {
              //     const data = [...prevState.data];
              //     data.push(newData);
              //     return { ...prevState, data };
              //   });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                changeProducts((products) => {
                  const data = [...products];
                  data[data.indexOf(oldData)] = newData;
                  props.postData();
                  return data;
                });

                // setState((prevState) => {
                //   const data = [...prevState.data];
                //   data[data.indexOf(oldData)] = newData;
                //   return { ...prevState, data };
                // });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();

              changeProducts((products) => {
                const data = [...products];
                data.splice(data.indexOf(oldData), 1);
                props.postData();
                return data;
              });

              //   setState((prevState) => {
              //     const data = [...prevState.data];
              //     data.splice(data.indexOf(oldData), 1);
              //     return { ...prevState, data };
              //   });
            }, 600);
          }),
      }}
    />
  );
}
