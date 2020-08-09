import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import "./Add_products_table";
import UploadImage from "./../../components/UploadImage/UploadImage";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

//The Add_products_table component.
const Add_products_table = (props) => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columnsTemp = [
    {
      title: "title",
      dataIndex: "title",
      width: "30%",
      editable: true,
    },
    {
      title: "image",
      dataIndex: "image",
    },
    {
      title: "price",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = columnsTemp.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    props.addingProducts(dataSource);
  }, [dataSource]);

  useEffect(() => {
    props.clear && setDataSource([]) && setCount(0);
  }, [props.clear]);

  //Delet a product.
  const handleDelete = (id) => {
    setDataSource((dataSource) => dataSource.filter((item) => item.id !== id));
  };

  //Add product.
  const handleAdd = () => {
    const newData = {
      id: count,
      title: `Add name`,
      image: <UploadImage />,
      price: `Add price`,
      quantity: `Add quantity`,
    };
    setDataSource((dataSource) => [...dataSource, newData]);
    setCount((count) => count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    props.addingProducts(dataSource);
  };

  // const [ dataSource, setDataSource ] = useState();

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a product
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default Add_products_table;
