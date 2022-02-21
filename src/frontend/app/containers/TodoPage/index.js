import React, { useRef } from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { getAllItemsApi, addItemApi, deleteItemApi, updateItemApi } from '../../../api/items';
import { editItems, editItemsDisplayState, addToken } from '../../../redux/actions';
import store from '../../../redux/store';

const { Content } = Layout;

function TodoPage() {
  // Get token and check token expire
  const token = store.getState().token;
  if (localStorage.getItem('tokenExpiresAt') && localStorage.getItem('tokenExpiresAt') <= Date.now()) {
    localStorage.clear();
    store.dispatch(addToken(''));
    return <>{alert('Session expired!')}</>;
  }

  // Refs
  const inputDataAdd = useRef(null);
  const inputDataUpdate = useRef([]);

  // States
  const [items, setItems] = React.useState([]);
  const [itemsDisplayState, setItemsDisplayState] = React.useState([]);
  const [alertStatus, setAlertStatus] = React.useState(false);

  //
  const getAllItems = async () => {
    const { error, data } = await getAllItemsApi(token);
    if (error === -1 || data.statusCode !== 200) {
      alert('Can not fetch data!');
    } else {
      setItems(data.data);
      store.dispatch(editItems(data.data));
      if (!itemsDisplayState.length) {
        setItemsDisplayState(Array(data.data.length).fill(false));
        store.dispatch(editItemsDisplayState(Array(data.data.length).fill(false)));
      }
    }
  };

  const addItem = async e => {
    const { error, data } = await addItemApi({ title: inputDataAdd.current.state.value }, token);
    if (error === -1 || data.statusCode !== 200) {
      alert('Error!');
    } else {
      setAlertStatus(true);
      setTimeout(() => {
        setAlertStatus(false);
        getAllItems();
      }, 2000);
    }
  };

  const deleteItem = async (id, e) => {
    const { error, data } = await deleteItemApi(id, token);
    if (error === -1 || data.statusCode !== 200) {
      alert('Failed!');
    } else {
      alert('Success!');
      getAllItems();
    }
  };

  const editItem = i => {
    const dt = itemsDisplayState;
    dt[i] = !dt[i];
    // Create new Array because of Immutibility
    const d = [...dt];
    setItemsDisplayState(d);
    store.dispatch(editItemsDisplayState(d));
  };

  const setRef = (el, i) => {
    inputDataUpdate.current[i] = el;
  };

  const updateItem = async (i, id) => {
    const { error, data } = await updateItemApi({ id, newTitle: inputDataUpdate.current[i].state.value }, token);
    if (error === -1 || data.statusCode !== 200) {
      alert('Failed!');
    } else {
      alert('Success!');
      getAllItems();
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('token') || store.getState().token) getAllItems();
  }, []);

  React.useEffect(() => {
    inputDataUpdate.current = inputDataUpdate.current.slice(0, items.length);
  });

  if (localStorage.getItem('token') || store.getState().token) {
    return (
      <Layout className="wrapper">
        <Content className="content">
          <Alert className="alert" style={alertStatus ? {} : { display: 'none' }} message="Success! Entity created" type="success" />
          <Input.Group compact className="btnAdd">
            <Input ref={inputDataAdd} style={{ width: 'calc(100% - 60px)' }} />
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
                      <Input ref={el => setRef(el, i)} style={{ width: 'calc(100% - 100px)' }} />
                      <Button type="primary" onClick={e => updateItem(i, item._id)}>
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

  // Redirect to HomePage
  return <>{alert('Please go to Home and login!')}</>;
}

export default TodoPage;
