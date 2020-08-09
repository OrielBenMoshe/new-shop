import React, { useState } from "react";
import "./ModalAddProduct";
import { Modal, Button } from "antd";
import Add_products_table from "../../pages/add_products_table/Add_products_table";
import { OmitProps } from "antd/lib/transfer/ListBody";
import axios from "axios";

const ModalAddProduct = (props) => {
  const [modalText, setModalText] = useState("Content of the modal");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [productAdded, setProductAdded] = useState([]);

  // const [newProducts, setNewProducts] = useState([]);

  const showModal = () => {
    setVisible(true);
    setClear(false);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    props.addingProducts(productAdded);
    setProductAdded([]);

    setTimeout(() => {
      setVisible(false);
      setClear(true);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    setClear(true);
    setProductAdded([]);
  };

  const addingProducts = (newData) => {
    setProductAdded(newData);
  };

  // const { visible, confirmLoading, ModalText } = this.state;
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add a new Products
      </Button>
      <Modal
        className="adding_products_modal"
        title="List of additional products"
        visible={visible}
        onOk={handleOk}
        okText="Add all products"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="80%"
        addingProducts={addingProducts}
      >
        <Add_products_table addingProducts={addingProducts} clear={clear} />
      </Modal>
    </>
  );
};

export default ModalAddProduct;
