import React, { useRef } from 'react';
import { Layout, Input, Button, Alert } from 'antd';
import './index.scss';
import { getAllItemsApi, addItemApi, deleteItemApi, updateItemApi } from '../../../api/items';
import { editItems, editItemsDisplayState, addToken } from '../../../redux/actions';
import store from '../../../redux/store';

const { Content } = Layout;
const token = store.getState().token;

function TodoPage() {
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
      }, 3000);
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
    getAllItems();
  }, []);

  React.useEffect(() => {
    store.dispatch({
      token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjYjZiZTUxZWZlYTZhNDE5ZWM5MzI1ZmVhYTFlYzQ2NjBmNWIzN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTI3MjAzMDQ2MDg0LTZrcnFsaHMxMDM5ZXRzM3IxbDh2ZWxmc3JjYTMzODEzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMDIyODcwMzk4OTI2ODMyNjczIiwiZW1haWwiOiJpbG9zdG15ZW1haWxoaWV1dkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il95dnIzQ2J1WkpNX05mUGd4S2lCQ1EiLCJuYW1lIjoiVi4gSGlldSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp5OEFUSGp2VVdlaUI0YUlXUmpFeWVibU1VUFR2dHdXYnZWZ1J3SD1zOTYtYyIsImdpdmVuX25hbWUiOiJWLiIsImZhbWlseV9uYW1lIjoiSGlldSIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjQ1NDI1NzQ2LCJleHAiOjE2NDU0MjkzNDYsImp0aSI6ImM2YzI0OTcyNmVhMjNiMGRmYjQxZjE3ZDhiZDI5MDE5ZTU2YzhiMjkifQ.M62HZ577ddNYEe5ctbkfu4eoRW4KIznqkNcZGrZ1dmQyntVCY7FfUXyyR9p1xxdH-xoJtWZzjfB89tB2kftOHr9CbRx6teGQKkSf05FV6uTsgIXvf0OteSnarJNDMjEgxjY3A969TvlGMjSQGhhqpuc2nrpG_L9RBuSak6yhYMHAjI5jD1GY9MdYxfDT5mXenozAEP54kp_zRVIrjFyUTPzE9-c4QplFdf3G8OnQ7Vj_2LIQ5FAqYQNo2faRFtbT8F3zSYRY02Z3t3L-rheNQ8lZJRdo5VCqFydTQ5PJ6-nFQrxnK-PoUWphJx3khvRTtmIefdiPfFtIFFo82SLk1w',
    });
    inputDataUpdate.current = inputDataUpdate.current.slice(0, items.length);
  });

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

export default TodoPage;
