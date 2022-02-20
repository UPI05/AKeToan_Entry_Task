import React from 'react';
import { Layout, Menu } from 'antd';
import './index.scss';

const { Header } = Layout;

function NavBar() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Todo List</Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default NavBar;
