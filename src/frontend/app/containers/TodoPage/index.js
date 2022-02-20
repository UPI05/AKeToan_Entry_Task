import React from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';

const { Content } = Layout;

function TodoPage() {
  return (
    <Layout className="wrapper">
      <Content className="content">
        <Alert className="alert" message="Success! Entity created" type="success" />
        <Input.Group compact className="btnAdd">
          <Input style={{ width: 'calc(100% - 60px)' }} />
          <Button type="primary">Add</Button>
        </Input.Group>
        <Layout className="tdlist">
          <Content className="item">
            <Input.Group compact>
              love1
              <Button type="primary" className="btnEdit">
                Edit
              </Button>
              <Button type="primary" className="btnDelete">
                Delete
              </Button>
            </Input.Group>
          </Content>
          <Content className="item">
            <Input.Group compact>
              love2
              <Button type="primary" className="btnEdit">
                Edit
              </Button>
              <Button type="primary" className="btnDelete">
                Delete
              </Button>
            </Input.Group>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default TodoPage;
