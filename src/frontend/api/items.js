import { Delete, get, post, update } from '../utils/fetchUtils';

export function getAllItemsApi(token = '') {
  return get('/api/v1/items/getAll', { Authorization: `Bearer ${token}` });
}

export function addItemApi(body, token = '') {
  return post('/api/v1/items/add', body, { Authorization: `Bearer ${token}` });
}

export function deleteItemApi(id, token = '') {
  return Delete(`/api/v1/items/delete/${id}`, { Authorization: `Bearer ${token}` });
}

export function updateItemApi(body, token = '') {
  return update('/api/v1/items/edit', body, { Authorization: `Bearer ${token}` });
}
