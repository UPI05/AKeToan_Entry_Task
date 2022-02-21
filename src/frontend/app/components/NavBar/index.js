import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './index.scss';

const { Header } = Layout;

function NavBar() {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/todos">Todo List</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default NavBar;
