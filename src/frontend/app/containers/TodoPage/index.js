import React, { useRef } from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItemsApi, addItemApi, deleteItemApi, updateItemApi } from '../../../api/items';
import { editItems, editItemsDisplayState, addToken } from '../../../redux/actions';
import store from '../../../redux/store';

const { Content } = Layout;

function TodoPage() {
  // Get data from redux store
  const items = useSelector(state => state.items);
  const itemsDisplayState = useSelector(state => state.itemsDisplayState);
  const token = useSelector(state => state.token);
  // const userInfo = useSelector(state => state.userInfo);

  // Dispatch to redux store
  const dispatch = useDispatch();

  // Refs
  const inputDataAdd = useRef(null);
  const inputDataUpdate = useRef([]);

  // States
  const [alertStatus, setAlertStatus] = React.useState(false);

  //
  const getAllItems = async () => {
    const { error, data } = await getAllItemsApi(token);
    if (error === -1 || data.statusCode !== 200) {
      alert('Can not fetch data!');
    } else {
      if (!itemsDisplayState.length) {
        dispatch(editItemsDisplayState(Array(data.data.length).fill(false)));
      }
      dispatch(editItems(data.data));
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
    dispatch(editItemsDisplayState(d));
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
    if (token) getAllItems();
  }, []);

  React.useEffect(() => {
    inputDataUpdate.current = inputDataUpdate.current.slice(0, items.length);
  });

  React.useEffect(() => {
    if (token) getAllItems();
  }, [token]);
  
  if (token) {
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
            {items.map((item, i) => {
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
  return <>{alert('Please login!')}</>;
}

export default TodoPage;
