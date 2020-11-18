import React, { useState, useRef } from "react";
import "./ModalAddProduct";
import { Modal, Button } from "antd";
import Add_products_table from "../../pages/add_products_table/Add_products_table";
import axios from "axios";

const ModalAddProduct = (props) => {
  const [modalText, setModalText] = useState("Content of the modal");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [productsAdded, setProductsAdded] = useState([]);
  const [imagesAdded, setImagesAdded] = useState([]);

  // const [newProducts, setNewProducts] = useState([]);

  const showModal = () => {
    setVisible(true);
    setClear(false);
  };

  //Sending the news products.
  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    //Upload images  new products to the server
    imagesAdded.map((image) => {
      axios.post("http://localhost:7000/uploadImages", image, {
        params: { filename: image.name },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      });
    });

    props.addingProducts(productsAdded);
    setProductsAdded([]);

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
    setProductsAdded([]);
  };

  const addingProducts = (newData) => {
    if (imagesAdded.length > 0 && newData.length > 0) {
      console.log("imagesAdded", imagesAdded);
      for (let i = 0; i < newData.length; i++) {
        newData[i].image = imagesAdded[i]
          ? imagesAdded[i].name
          : "noproduct.png";
      }
      console.log(newData);
      setProductsAdded(newData);
    }
  };

  const imagesToUpload = (imagesArr) => {
    setImagesAdded(imagesArr);
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
        <Add_products_table
          imagesToUpload={imagesToUpload}
          addingProducts={addingProducts}
          clear={clear}
        />
      </Modal>
    </>
  );
};

export default ModalAddProduct;
