import React, { useRef } from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';
import { getAllItemsApi, addItemApi } from '../../../api/items';

const { Content } = Layout;

function TodoPage() {
  const getAllItems = async () => {
    const dt = await getAllItemsApi();
    setItems(dt.data);
  };

  const addItem = async e => {
    const res = await addItemApi({ title: inputData.current.state.value });
    getAllItems();
  };

  const inputData = useRef(null);

  const [items, setItems] = React.useState();

  React.useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Layout className="wrapper">
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
            items.map(item => {
              return (
                <Content className="item">
                  <Input.Group compact>
                    {item.title}
                    <Button type="primary" className="btnEdit">
                      Edit
                    </Button>
                    <Button type="primary" danger className="btnDelete">
                      Delete
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
