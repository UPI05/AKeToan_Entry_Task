import React, { useRef } from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';
import { getAllItemsApi, addItemApi, deleteItemApi } from '../../../api/items';

const { Content } = Layout;

function TodoPage() {
  const inputData = useRef(null);

  const [items, setItems] = React.useState([]);
  const [itemsDisplayState, setItemsDisplayState] = React.useState([]);

  const getAllItems = async () => {
    const dt = await getAllItemsApi();
    setItems(dt.data);
    setItemsDisplayState(Array(dt.data.length).fill(false));
  };

  const addItem = async e => {
    const res = await addItemApi({ title: inputData.current.state.value });
    getAllItems();
  };

  const deleteItem = async (id, e) => {
    const res = await deleteItemApi(id);
    getAllItems();
  };

  const editItem = i => {
    const dt = itemsDisplayState;
    dt[i] = !dt[i];
    console.log(dt);
    console.log(i);
    const d = [];
    for (let x = 1; x <= items.length; x += 1) d.push(dt[x - 1]);
    console.log(d);
    setItemsDisplayState(d);
  };

  React.useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Layout className="wrapper">
      {alert('ok')}
      <Content className="content">
        <Alert className="alert" message="Success! Entity created" type="success" />
        <Input.Group compact className="btnAdd">
          <Input ref={inputData} style={{ width: 'calc(100% - 60px)' }} />
          <Button type="primary" onClick={addItem}>
            Add
          </Button>
        </Input.Group>
        <Layout className="tdlist">
          {items &&
            items.map((item, i) => {
              return (
                <Content className="item" key={i}>
                  <Input.Group compact>
                    {item.title}
                    <Button
                      type="primary"
                      onClick={e => {
                        editItem(i);
                      }}
                      className="btnEdit"
                    >
                      Edit
                    </Button>
                    {/* eslint no-underscore-dangle: 0 */}
                    <Button onClick={() => deleteItem(item._id)} type="primary" danger className="btnDelete">
                      Delete
                    </Button>
                  </Input.Group>
                  <Input.Group compact className="btnUpdate" style={itemsDisplayState[i] === false ? { display: 'none' } : {}}>
                    <Input style={{ width: 'calc(100% - 100px)' }} />
                    <Button type="primary" onClick={addItem}>
                      Update
                    </Button>
                  </Input.Group>
                </Content>
              );
            })}
        </Layout>
      </Content>
    </Layout>
  );
}

export default TodoPage;